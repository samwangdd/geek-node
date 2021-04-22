const koa = require('koa');
const mount = require('koa-mount');
const fs = require('fs');
const static = require('koa-static');
const graphqlHTTP = require('koa-graphql');

const app = new koa();

const schema = require(`${__dirname}/schema/index`);
app.use(mount('/api', graphqlHTTP({ schema: schema })));

app.use(mount('/static', static(`${__dirname}/source/static`)));

app.use(
  mount('/', async ctx => {
    ctx.status = 200;
    ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`, 'utf-8');
  }),
);

module.exports = app;
