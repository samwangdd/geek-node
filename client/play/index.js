const koa = require('koa');
const mount = require('koa-mount');
const fs = require('fs');
const static = require('koa-static');

const app = new koa();

app.use(mount('/static', static(`${__dirname}/source/static`)));

app.use(
  mount('/', async ctx => {
    console.log('ctx :>> ', ctx);
    ctx.status = 200;
    ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`, 'utf-8');
  }),
);

module.exports = app;
