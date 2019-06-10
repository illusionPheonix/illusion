
// 引入模块
const ws = require('nodejs-websocket')

// 创建服务器
const server = ws.createServer(socket => {  // socket是一个连接对象
    console.log('连接成功...')

    // 绑定text事件 接收前端内容
    socket.on('text', (str) => {
        // 后端把数据发送给前端
        socket.sendText( str + '!!!' )
    })

    // 监听连接关闭
    socket.on('close', () => {
        console.log('连接已关闭...')
    })

    // 监听错误
    socket.on('error', (err) => {
        console.log(err)
    })
})

// 监听端口
server.listen(666)

console.log('服务器启动成功, ws://localhost:666')