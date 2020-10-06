import io from 'socket.io-client';
let socket = io("ws://localhost:4000/");
export default socket

socket.on('enter', function (data) {
  console.log('客户端接收服务器发送的消息', data)
})
socket.on('message', function (data) {
  console.log('客户端接收服务器发送的消息', data)
})


socket.on('leave', function (data) {
  console.log('客户端接收服务器发送的消息', data)
})