const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    if (res.url === '/favicon.ico') {
      res.writeHead(200);
      res.end();
      return;
    }

    res.writeHead(200);
    // 输出网页
    fs.createReadStream(__dirname + '/template.html').pipe(res);
  })
  .listen(3000);
