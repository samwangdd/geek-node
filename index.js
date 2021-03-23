const glob = require('glob');

// 阻塞式
// let result;
// console.time();
// result = glob.sync(__dirname + '/**/*');
// console.timeEnd();
// console.log('result :>> ', result);

// 非阻塞式
let result;
console.time();
glob(__dirname + '/**/*', (err, res) => {
  result = res;
  // console.log('result :>> ', result);
});
console.timeEnd();
console.log('1+1 = :>> ', 1 + 1);
console.log('__dirname :>> ', __dirname);
