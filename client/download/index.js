const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');

const app = new koa();

app.use(
  mount('/', async ctx => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
  }),
);

// const port = 4000;
// app.listen(port);
module.exports = app;
