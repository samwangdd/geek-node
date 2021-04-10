const RPC = require('./rpc-server');
const { HEADER_LENGTH, SEQ_LENGTH } = require('/constant/common');

module.exports = function (requestSchema, responseSchema) {
  return new RPC({
    decodeRequest(buffer) {
      const seq = buffer.readInt32BE();
      return { seq: seq, result: requestSchema.decode(buffer.slice(HEADER_LENGTH)) };
    },
    encodeResponse(data, seq) {
      const body = responseSchema.encode(data);
      const head = Buffer.alloc(HEADER_LENGTH);
      head.writeUInt32BE(seq);
      head.writeUInt32BE(body.length, 4);

      return Buffer.concat([head, body]);
    },
    isCompleteRequest(buffer) {
      const bodyLength = buffer.readInt32BE(SEQ_LENGTH);
      return bodyLength + HEADER_LENGTH;
    },
  });
};
