const koa = require('koa');
const mount = require('koa-mount');

const router = require('./router');
const app = new koa();

Object.keys(router).forEach(routerPath => {
  app.use(
    mount(routerPath, async ctx => {
      ctx.status = 200;
      ctx.body = await router[routerPath](ctx.query);
    }),
  );
});

app.listen(3000, () => console.log('app listen :>> ', 3000));
