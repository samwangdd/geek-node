/**
 * 评论点赞
 */
const fs = require('fs');
const protobuf = require('protocol-buffers');

const appRoot = process.cwd();
const schema = protobuf(fs.readFileSync(`${appRoot}/constant/comment.proto`));

const createSocket = require(`${appRoot}/utils/server/createSocket`);
module.exports = createSocket({
  port: 4007,
  schema: schema,
  schemaKey: ['PraiseRequest', 'PraiseResponse'],
});
