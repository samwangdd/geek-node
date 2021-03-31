const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');

const app = new koa();
const port = 4000;

app.use(
  mount('/', async ctx => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
  }),
);

app.listen(port);
