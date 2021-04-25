const koa = require('koa');
const mount = require('koa-mount');
const fs = require('fs');
const static = require('koa-static');
const graphqlHTTP = require('koa-graphql');
const { buildSchema } = require('graphql');
const commentListClient = require('./rpc-client/comment-list');
const praiseClient = require('./rpc-client/comment-praise');

// const schema = buildSchema(fs.readFileSync('./schema/comment.gql', 'utf-8'));
const app = new koa();
const root = {
  comment: () => {
    return new Promise((resolve, reject) => {
      commentListClient.write(
        {
          columnid: 0,
        },
        function (err, res) {
          err ? reject(err) : resolve(res.comments);
        },
      );
    });
  },
  praise: ({ id }) => {
    return new Promise((resolve, reject) => {
      praiseClient.write(
        {
          commentid: id,
        },
        function (err, res) {
          err ? reject(err) : resolve(res.praiseNum);
        },
      );
    });
  },
};

const schema = buildSchema(fs.readFileSync(`${__dirname}/schema/comment.gql`, 'utf-8'));
// const schema = require(`${__dirname}/schema/index`);
app.use(mount('/api', graphqlHTTP({ schema: schema, graphiql: true, rootValue: root })));
// localhost:3005/play/api/graphql graphql Web UI

app.use(mount('/static', static(`${__dirname}/source/static`)));

app.use(
  mount('/', async ctx => {
    ctx.status = 200;
    ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`, 'utf-8');
  }),
);

module.exports = app;
