/**
 * 聊天核心js文件: chat.js
 * 2019-06-09 by 谢公子
 */
$(function () {
    // 连接服务器
    const socket = io('ws://localhost:3000');

    // 定义变量 用于保存用户名
    let userName;

    /* 登录 */
    $('#login-btn').click(function () {
        // 获取用户名
        userName = $('#user-name').val();

        if (!userName) {
            alert('请输入用户名!')
            return
        } 
        // 发送给服务器
        socket.emit('login', { userName })
    })
    // 登录成功
    socket.on('loginSuccess', (msg) => {
        alert(msg); // 弹出提示

        // 隐藏登录界面  显示聊天界面
        $('.login-wrap').hide(1000)
        $('.chat-wrap').show(1000)
    })

    // 登录失败
    socket.on('loginFail', (msg) => {
        alert(msg); // 弹出提示
    })

    // 接收广播登入聊天室信息
    socket.on('addNewUser', (userName) => {
        // 渲染页面
        $('.info').append(`<p><span>系统提示：${userName}加入群聊!</span></p>`)
    })


    /* 聊天 */
    // 发送按钮
    $('.sendBtn').click(function () {
        sendMsg()   // 发送信息
    })
    // 输入框回车
    $('.msg').keydown(function (e) {
        if (e.which === 13) {
            sendMsg()  // 发送信息
        }
    })

    function sendMsg() {
        // 获取信息
        let msg = $('.msg').val();
        // 发送给后端
        socket.emit('sendMsg', msg)
    }

    // 接收用户发送的信息
    socket.on('message', (data) => {
        let html = '';
        // 判断
        if (data.userName === userName) {
            html = `<p class="right-msg"><span>${data.msg}</span><span>${data.userName}</span></p>`;
        } else {
            html = `<p class="left-msg"><span>${data.userName}</span><span>${data.msg}</span></p>`;
        }
        // 渲染
        $('.center').append( html )
    })

    // 离开
    socket.on('leave', (userName) => {
        if (userName !== null) {
            // 渲染页面
            $('.info').append(`<p><span>系统提示：${userName}退出群聊!</span></p>`)
        }
    })
})
