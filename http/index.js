const http = require('http');
const fs = require('fs');
const url = require('url'); // 解析 URL
const querystring = require('querystring'); // 将 string 解析为 object

const game = require('../commonjs/game');

http
  .createServer((request, response) => {
    const parseUrl = url.parse(request.url);
    const { pathname, query } = parseUrl;
    if (pathname === '/favicon.ico') {
      response.writeHead(200);
      response.end();
      return;
    }

    if (pathname === '/game') {
      const _query = querystring.parse(query);
      const _action = _query.action;
      const gameRes = game(_action);
      console.log('gameRes :>> ', gameRes);
      response.writeHead(200);

      if (gameRes === 0) {
        response.end('平局');
      } else if (gameRes === 1) {
        response.end('你输了！');
      } else {
        response.end('你赢了！');
      }
    }

    if (pathname === '/') {
      response.writeHead(200);
      // 输出网页
      fs.createReadStream(__dirname + '/index.html').pipe(response);
    }
  })
  .listen(3000);
