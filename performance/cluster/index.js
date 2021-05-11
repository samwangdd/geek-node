// 创建进程，守护进程
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // 主进程处理逻辑
  for (let i = 0; i < os.cpus().length / 2; i++) {
    createWorker();
  }
  // 重启子进程
  cluster.on('exit', worker => {
    console.log('worker exit :>> ', worker.process.pid);
    setTimeout(() => {
      createWorker();
    }, 5000);
  });
} else {
  // 子进程处理逻辑，监听各类错误和异常，回应心跳检测
  // 监听子进程崩溃错误
  process.on('uncaughtException', err => {
    // 这里可以写日志、上报错误
    console.log('err :>> ', err);
    process.exit(1);
  });

  // 内存泄漏退出程序
  if (process.memoryUsage().rss > 700 * 1024 * 1024) {
    // console.log('process.memoryUsage().rss :>> ', process.memoryUsage().rss);
    process.exit(1);
  }

  // 回应心跳检测
  process.on('message', res => {
    process.send(`pong #${process.pid}`);
  });
  require('./app');
}

/**
 * 创建子进程，并检测心跳
 */
function createWorker() {
  const worker = cluster.fork();
  let missed = 0;

  const heartBeat = setInterval(() => {
    // 判断心跳正常
    if (missed >= 3) {
      clearInterval(heartBeat);
      console.log(worker.process.pid + ' has become a zombie');
      process.kill(worker.process.pid);
    }
    // 发送心跳检测
    worker.send('ping #' + worker.process.pid);
    missed++;
  }, 3000);

  worker.on('message', res => {
    if (res === 'pong #' + worker.process.pid) {
      // console.log('master get message :>> ', worker.process.pid);
      missed--;
    }
  });

  worker.on('exit', () => {
    clearInterval(heartBeat);
  });

  console.log('worker start :>> ', worker.process.pid);
}
