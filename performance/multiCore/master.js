const cp = require('child_process');

const child_process = cp.fork(__dirname + '/child.js');

child_process.send('haha');

child_process.on('message', res => {
  console.log('master res :>> ', res);
});
