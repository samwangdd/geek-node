/**
 * 获取评论列表
 */
const fs = require('fs');
const protobuf = require('protocol-buffers');

const appRoot = process.cwd();
const schema = protobuf(fs.readFileSync(`${appRoot}/constant/comment.proto`));

const createSocket = require('../../util/createSocket');
module.exports = createSocket({
  port: 4006,
  schema: schema,
  schemaKey: ['CommentListRequest', 'CommentListResponse'],
});
