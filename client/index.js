const mount = require('koa-mount');
const koa = require('koa');
const url = require('url');

const app = new koa();

app.use(async (ctx, next) => {
  const parsedUrl = url.parse(ctx.url);
  if (
    parsedUrl.pathname === '/download' ||
    parsedUrl.pathname === '/detail' ||
    parsedUrl.pathname === '/play' ||
    parsedUrl.pathname === '/list'
  ) {
    parsedUrl.pathname = parsedUrl.pathname + '/';
    ctx.redirect(url.format(parsedUrl));
    return;
  }

  await next();
});

app.use(mount('/detail', require('./detail/index')));

app.use(mount('/download', require('./download/index')));

app.listen(3005, () => {
  console.log('client listen 3005 :>> ');
});
