const net = require('net');

module.exports = class RPC {
  constructor({ encodeResponse, decodeRequest, isCompleteRequest }) {
    this.encodeResponse = encodeResponse;
    this.decodeRequest = decodeRequest;
    this.isCompleteRequest = isCompleteRequest; // 获取 buffer 长度
  }

  createServer(callback) {
    let buffer = null;

    const tcpServer = net.createServer(socket => {
      socket.on('data', data => {
        buffer =
          buffer && buffer.length > 0
            ? Buffer.concat([buffer, data]) // 有遗留数据才做拼接操作
            : data;

        let checkLength = null;
        while (buffer) {
          checkLength = this.isCompleteRequest(buffer);
          let requestBuffer = null;
          if (checkLength === buffer.length) {
            requestBuffer = buffer;
            buffer = null;
          } else {
            // 对于大文件被拆分为多个包怎么处理？
            requestBuffer = buffer.slice(0, checkLength);
            buffer = buffer.slice(checkLength);
          }

          const request = this.decodeRequest(requestBuffer);
          callback(
            {
              // request
              body: request.result,
              socket,
            },
            {
              // response
              end: data => {
                const buffer = this.encodeResponse(data, request.seq);
                socket.write(buffer);
              },
            },
          );
        }
      });
    });

    return {
      listen() {
        tcpServer.listen.apply(tcpServer, arguments);
      },
    };
  }
};
