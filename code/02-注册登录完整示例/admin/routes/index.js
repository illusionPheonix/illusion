var express = require('express');
var router = express.Router();

// 引入mysql模块
const mysql = require('mysql')

// 创建连接对象
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'admin'
})

// 执行连接
connection.connect();
console.log('数据库连接成功!')

// 拦截所有路由 处理跨域
router.all('*', (req, res, next) => {
  // 统一设置响应头
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  // 放行
  next()
})

/* 注册 */
router.post('/register', (req, res) => {
  // 接收参数
  let { account, password } = req.body;

  // 1. 准备sql语句
  const sqlStr = `insert into users(account, password) values('${account}', '${password}')`;
  // 2. 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;

    // 插入的结果data是一个对象 里面有个属性叫affectedRows（受影响的行数）如果大于0 证明至少影响了一行 成功！
    if (data.affectedRows > 0) {
      res.send({code: 0, msg: '注册成功'})
    } else {
      res.send({code: 1, msg: '注册失败'})
    }
  })
})

/* 检查用户名是否存在 */
router.get('/isaccountexist', (req, res) => {
  // 接收参数
  let { account } = req.query;

  // 1. 构造sql
  const sqlStr = `select * from users where account = '${account}'`;

  // 2. 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;

    // 判断
    if (data.length) {
      res.send({code: 1, msg: '用户名已经存在'})
    } else {
      res.send({code: 0, msg: '用户名可以使用'})
    }
  })
})

/* 登录 */
router.post('/checklogin', (req, res) => {
   // 接收参数
   let { account, password } = req.body;

   // 1. 准备sql语句
   const sqlStr = `select * from users where account='${account}' and password='${password}'`;
   // 2. 执行sql
   connection.query(sqlStr, (err, data) => {
     if (err) throw err;
      // 判断
      if (data.length) {
        res.send({code: 0, msg: '登录成功'})
      } else {
        res.send({code: 1, msg: '登录失败'})
      }
   })
})


module.exports = router;
