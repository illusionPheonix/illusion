/* 服务器代码 聊天程序的服务器 */

// 引入http模块 创建服务器对象
const server = require('http').createServer();

// 把服务器对象传入socket.io 生成一个io对象
const io = require('socket.io')( server );


// 定义一个用户名数组
let users = []; // 用户保存用户



// 监听连接事件
io.on('connection', (socket) => {
	console.log('连接成功...')	
	
	let isNewUser = true;  // 是否是新用户（是否是一个新的用户名 没有人用过的）
	let userName;   // 用户名
	
	// 接收登录用户名
	socket.on('login', (data) => {
		// 循环用户数组 看这个昵称有没有被使用过
		for (let i = 0; i < users.length; i++) {
			if (users[i].userName === data.userName) {
				isNewUser = false;
				break;
			} else {
				isNewUser = true;
			}
		}
		
		// 如果是新用户
		if (isNewUser) {
			// 保存名字 且 把新用户存入数组
			userName = data.userName;
			users.push( data )
			
			// 发送数据给前端
			socket.emit('loginSuccess', '登录成功')
			// 广播信息
			io.sockets.emit('addNewUser', userName)
		} else {
			// 发送数据给前端
			socket.emit('loginFail', '昵称重复')
		}
	})
	
	// 接收信息
	socket.on('sendMsg', (msg) => {
		// 把信息广播给每一个用户
		io.sockets.emit('message', {userName, msg})
	})
	
	// 监听断开连接事件
	socket.on('disconnect', () => {
		console.log('断开连接...')
		// 广播数据给前端
		io.sockets.emit('leave',userName)
		// 删除退出的用户
		users.forEach((v, i) => {
			if (v.userName === userName) {
				users.splice(i, 1)
			}
		})
	})
})




// 监听端口
server.listen(3000)

// 打印提示信息
console.log('服务器启动成功，ws://localhost:3000')


 