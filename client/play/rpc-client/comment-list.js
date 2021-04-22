/**
 * 获取评论列表
 */
const fs = require('fs');
const protobuf = require('protocol-buffers');
const createSocket = require('../../util/createSocket');
const schema = protobuf(fs.readFileSync(`${__dirname}/../schema/comment.proto`));

module.exports = createSocket({
  port: 4006,
  schema: schema,
  reqSchemaKey: 'CommentListRequest',
  resSchemaKey: 'CommentListResponse',
});
