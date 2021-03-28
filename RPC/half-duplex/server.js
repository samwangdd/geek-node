const net = require('net');
const { port, lessons } = require('./const');

// 创建 tcp 服务
const server = net.createServer(socket => {
  // 监听客户端请求
  socket.on('data', buffer => {
    console.log('id :>> ', buffer.readInt32BE());
    const id = buffer.readInt32BE();

    // 向客户端返回数据
    setTimeout(() => {
      socket.write(Buffer.from(lessons[id]));
    }, 1000);
  });
});

// 监听端口，启动服务
server.listen(port);
