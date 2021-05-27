const koa = require('koa');
const mount = require('koa-mount');

const router = require('./router');
const createTemplate = require('./utils/createTemplate');
const requestFactory = require('./utils/request-factory');

const app = new koa();

// TODO: 自动注册通信（请求）协议
requestFactory.registerProtocol('geek-rpc', require('./requestors/geek-rpc'));
requestFactory.registerProtocol('http', require('./requestors/http'));

Object.keys(router).forEach(routerPath => {
  // 路由对应的请求配置
  const dataConf = eval(router[routerPath].data);
  const requests = Object.keys(dataConf).reduce((acc, key) => {
    acc[key] = requestFactory(dataConf[key]); // 实例化请求
    return acc;
  }, {});
  const template = createTemplate(router[routerPath].template);

  app.use(
    mount(routerPath, async ctx => {
      ctx.status = 200;
      const result = {};
      await Promise.all(
        Object.keys(requests).map(key => {
          return requests[key](ctx.query).then(res => {
            result[key] = res.result;
            return res.result;
          });
        }),
      );

      try {
        ctx.body = await template(result);
      } catch (error) {
        ctx.status = 500;
        ctx.body = error.stack;
      }
    }),
  );
});

app.listen(3000, () => console.log('app listen :>> ', 3000));
