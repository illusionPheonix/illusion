var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', (req, res) => {
//   // ejs模板和json格式数据合并渲染生html 响应给前端浏览器
//   res.render('index.ejs', { title: '哈哈哈哈' });
// });

// router.get('/', (req, res) => {
//   res.send('111') // 响应数据给前端浏览器
// })

// router.get('/home', (req, res) => {
//   res.send('666')
// })

// router.get('/checkLogin', (req, res) => {
//   res.send('测试登录路由')
// })


router.get('/userlist', (req, res) => {
  // 设置响应头允许跨域
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')

  res.send('我是用户列表')
})


router.post('/isaccountexist', (req, res) => {
  // 设置响应头允许跨域
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')

  // 接收账号
  let { account } = req.body;

  // 已经有的账号
  let accountArr = ['李寻欢', '小貂蝉', '取个名字好难', '赵子龙']
  
  // 如果账号已经存在 响应数据给前端
  if (accountArr.includes( account )) {
    res.send({code: 1, msg: '账号已经存在'})
  } else {
    res.send({code: 0, msg: '可以使用'})
  }
})


module.exports = router;
