const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  console.log('first');
  await next();
  console.log('fist end');
});

app.use(async (ctx, next) => {
  ctx.status = 200;
  console.log('seconded');
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('wait 500ms :>> ');
      resolve();
    }, 500);
  });
  console.log('seconded end');
});

app.listen(3003);
