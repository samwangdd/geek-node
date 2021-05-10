const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // 将服务器一半的 CPU 用来启动服务
  for (let i = 0; i < os.cpus().length / 2; i++) {
    cluster.fork();
  }
} else {
  require('./app');
}
