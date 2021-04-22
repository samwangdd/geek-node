/**
 * 创建 GraphQL 协议
 */
const { buildSchema } = require('graphql');
const fs = require('fs');

// 创建 GrapqlSchema 实例
const schema = buildSchema(fs.readFileSync(`${__dirname}/comment.gql`, 'utf-8'));

// 一个后端服务（使用一个端口），对应需要一个前端 rpc client
const commentListClient = require('../rpc-client/comment-list');
const pariseClient = require('../rpc-client/comment-praise');

console.log('schema.getQueryType() :>> ', schema.getQueryType().getFields());
// 定义 graphql 协议获取数据的过程
schema.getQueryType().getFields().comment.resolve = () => {
  return new Promise((resolve, reject) => {
    commentListClient.write(
      {
        columnid: 0,
      },
      function (err, res) {
        console.log('err :>> ', err);
        console.log('res :>> ', res);
        err ? reject(err) : resolve(res.comments);
      },
    );
  });
};

module.exports = schema;
