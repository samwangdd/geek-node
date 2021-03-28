const net = require('net');
const { port, lessonids } = require('./const');

// 创建 socket
const socket = new net.Socket({});

// 连接服务
socket.connect({
  host: '127.0.0.1',
  port: port,
});

fetchData();

// 监听服务端返回数据
socket.on('data', buffer => {
  console.log('buffer.toString() :>> ', buffer.toString());
  // 半双工通信：接收数据后再次请求
  fetchData();
});

// 编码方法
function encode(index) {
  let buffer = Buffer.alloc(4);
  buffer.writeInt32BE(lessonids[index]);
  return buffer;
}

// 向服务器传送数据
function fetchData() {
  const index = Math.floor(Math.random() * lessonids.length);
  socket.write(encode(index));
}
