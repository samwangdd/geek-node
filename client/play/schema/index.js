/**
 * 创建 GraphQL 协议
 */
const { buildSchema } = require('graphql');
const fs = require('fs');

// 创建 GrapqlSchema 实例
const schema = buildSchema(fs.readFileSync(`${__dirname}/comment.gql`, 'utf-8'));

// 一个后端服务（使用一个端口），对应需要一个前端 rpc client
const commentListClient = require('../rpc-client/comment-list');
const praiseClient = require('../rpc-client/comment-praise');

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

schema.getMutationType().getFields().praise.resolve = (args0, { id }) => {
  console.log('id :>> ', id);
  return new Promise((resolve, reject) => {
    praiseClient.write(
      {
        commentid: id,
      },
      function (err, res) {
        console.log('res :>> ', res);
        err ? reject(err) : resolve(res.praiseNum);
      },
    );
  });
};

module.exports = schema;
