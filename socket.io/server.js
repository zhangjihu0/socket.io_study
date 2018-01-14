/***
 * 聊天室 页面(express)+消息通信(socket.io)
 * 
*/
let express = require('express');
let path = require('path');
//express是一个函数，调用后会返回一个http的监听函数
let app = express();
//把node_modules作为静态文件根目录
app.use(express.static(path.resolve('../node_modules')))
//当客户端通过get 方式返回/路径的时候，服务器返回index。HTML文件
app.get('/',function(req,res){
    res.sendFile(path.resolve('index.html'))
})
// app.listen()相当于 
//创建一个http服务
let server = require('http').createServer(app);
// 创建一个IO，并且把server作为参数传入进来；
let io = require('socket.io')(server);
//监听客户端连接，当连接到来的时候执行对应的回调函数；
//socket对象是每个客户端专属有一个
io.on('connection',function(socket){
    //当服务器端接收到客户端的消息后执行回调函数
    socket.on('message',function(msg){
       
        // console.log(msg);
        // socket.send('服务器说:'+msg)
        //广播给所有的人
        io.emit('message',msg);
    })
})
server.listen(8080)
/**
 * 1.实现匿名聊天
 *      1.给按钮绑定事件或者给表单绑定事件；
 *      2.在提交表单的时候取消默认事件，2取消消息内容发送给服务器
 *      3.服务器接收发送客户端发过来的消息，广播给所有的客户端
 *      4.其他客户端收到消息后把发到消息列表的里的显示出来    
 *   
 *  **/ 