const mount = require('koa-mount');
const static = require('koa-static');
const koa = require('koa');

const app = new koa();
const rpcClient = require('./client');
const template = require('./template');
const detailTemplate = template(__dirname + '/source/index.html');

app.use(mount('/static', static(`${__dirname}/source/static/`)));

app.use(async ctx => {
  // 获取数据
  const result = await new Promise((resolve, reject) =>
    rpcClient.write({ columnid: ctx.query.columnid }, (err, data) => {
      err ? reject(err) : resolve(data);
    }),
  );

  ctx.status = 200;
  // 模版注水
  ctx.body = detailTemplate(result);
});

module.exports = app;
