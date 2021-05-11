const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    setTimeout(() => {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(fs.readFileSync(__dirname + '/index.htm', 'utf-8'));
      // while (true) {} // 模拟程序死循环
      // console.log('href :>> ', window.location.href); // 模拟程序崩溃
    }, 500);
  })
  .listen(3000, () => {
    // console.log('listening :>> ', 3000);
  });
