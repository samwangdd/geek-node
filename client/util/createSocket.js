const EasySock = require('easy_sock');

module.exports = function (args) {
  const { port, schema, ip = '127.0.0.1', timeout = 3500, reqSchemaKey, resSchemaKey } = args;

  const easySock = new EasySock({
    ip: ip,
    port: port,
    timeout: timeout,
    keepAlive: true,
  });

  // 编码
  easySock.encode = function (data, seq) {
    const body = schema[reqSchemaKey].encode(data);
    const head = Buffer.alloc(8);
    head.writeInt32BE(seq);
    head.writeInt32BE(body.length, 4);

    return Buffer.concat([head, body]);
  };

  // 解码
  easySock.decode = function (buffer) {
    const seq = buffer.readInt32BE();
    const body = schema[resSchemaKey].decode(buffer.slice(8));

    return {
      result: body,
      seq,
    };
  };

  // buffer 是否完整
  easySock.isReceiveComplete = function (buffer) {
    if (buffer.length < 0) {
      return 0;
    }
    const bodyLength = buffer.readInt32BE(4);
    if (buffer.length >= bodyLength + 8) {
      return bodyLength + 8;
    } else {
      return 0;
    }
  };

  return easySock;
};
