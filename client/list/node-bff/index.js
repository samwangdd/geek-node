const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');
const ReactDomServer = require('react-dom/server');
require('babel-register')({
  presets: ['react'],
});

const makeTemplate = require(`../../util/makeTemplate`);
const template = makeTemplate(`${__dirname}/index.htm`);
const getData = require('./get-data');
const reactApp = require('./app.jsx');

const app = new koa();

app.use(mount('/static', static(__dirname + '/source')));

app.use(
  mount('/data', async ctx => {
    ctx.body = await getData(ctx.query.sort, ctx.query.filter);
  }),
);

app.use(
  mount('/', async ctx => {
    ctx.status = 200;
    const sortType = ctx.query.sort || 0;
    const filtType = ctx.query.filter || 0;
    const data = await getData(sortType, filtType);
    ctx.body = template({
      reactString: ReactDomServer.renderToString(reactApp(data)),
      reactData: data,
      filtType,
      sortType,
    });
  }),
);

module.exports = app;
