const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(fs.readFileSync(__dirname + '/index.htm', 'utf-8'));
  })
  .listen(3000, () => {
    console.log('listening :>> ', 3000);
  });
