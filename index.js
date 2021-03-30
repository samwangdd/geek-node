const game = require('./commonjs/game');
// const length = process.argv.length;
// const playerAction = process.argv[length - 1];

// if (length < 3) {
//   console.log('你耍赖！ :>> ');
//   return;
// }

let count = 0;
process.stdin.on('data', e => {
  // console.log('process.stdin.read() :>> ', process.stdin.read());
  // const chunk = process.stdin.read();
  // if (chunk) {
  //   process.stdout.write('data >>  ' + chunk);
  // }
  const playerAction = e.toString().trim();
  const result = game(playerAction);
  console.log('result :>> ', result);
  if (result.point === -1) {
    count++;
  }
  console.log('count :>> ', count);
  if (count >= 3) {
    console.log('-------------- :>> ');
    console.log('你太强了，我不玩了！');
    process.exit();
  }
});
