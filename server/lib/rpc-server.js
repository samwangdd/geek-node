const net = require('net');

module.exports = class RPC {
  constructor({ encodeResponse, decodeRequest, isCompleteRequest }) {
    this.encodeResponse = encodeResponse;
    this.decodeRequest = decodeRequest;
    this.isCompleteRequest = isCompleteRequest;
  }

  createServer(callback) {
    let buffer = null;

    const tcpServer = net.createServer(socket => {
      socket.on('data', data => {
        buffer = buffer && buffer.lengh > 0 ? Buffer.concat([buffer, data]) : data; // 如果有遗留数据才进行数据拼接
        let checkLength = null;
        while (buffer && (checkLength = this.isCompleteRequest(buffer))) {
          let requestBuffer = null;
          if (checkLength === buffer.length) {
            requestBuffer = buffer;
            buffer = null;
          } else {
            requestBuffer = buffer.slice(0, checkLength);
            buffer = buffer.slice(checkLength);
          }
          const request = this.decodeRequest(requestBuffer);
          callback(
            // request
            { body: request.result, socket },
            // response
            {
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
