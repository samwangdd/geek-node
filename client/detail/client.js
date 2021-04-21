/**
 * client 端 rpc 通信 socket
 * 提供编解码能力、判断包完整性
 */
const EasySock = require('easy_sock');
const protobuf = require('protocol-buffers');
const fs = require('fs');

const schemas = protobuf(fs.readFileSync(__dirname + '/../../constant/detail.proto'));
const { HEADER_LENGTH, SEQ_LENGTH } = require(__dirname + '/../../constant/common');

const easySock = new EasySock({
  ip: '127.0.0.1',
  port: 4005,
  timeout: 500,
  keepAlive: true,
});

easySock.encode = function (data, seq) {
  console.log('data :>> ', data);
  const body = schemas.ColumnRequest.encode(data);
  const head = Buffer.alloc(HEADER_LENGTH);

  head.writeInt32BE(seq);
  head.writeInt32BE(body.length, SEQ_LENGTH);

  return Buffer.concat([head, body]);
};

easySock.decode = function (buffer) {
  const seq = buffer.readInt32BE();
  const body = schemas.ColumnResponse.decode(buffer.slice(HEADER_LENGTH));

  return { result: body, seq };
};

easySock.isReceiveComplete = function (buffer) {
  const length = buffer.length;
  // 如果 buffer 长度比约定的 header 更短，表明不是完整的 buffer
  if (length < HEADER_LENGTH) {
    return 0;
  }

  const bodyLength = buffer.readInt32BE(SEQ_LENGTH);
  if (length >= bodyLength + HEADER_LENGTH) {
    return bodyLength + HEADER_LENGTH;
  } else {
    return 0;
  }
};

module.exports = easySock;
