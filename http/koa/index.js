const fs = require('fs');
const process = require('process');
const koa = require('koa');
const mount = require('koa-mount');
const game = require('../../commonjs/game');

const app = new koa();
const port = 3001;
const actionMap = {
  rock: 'U+1FAA8',
  scissor: 'U+2702',
  paper: 'U+1F9FB',
};

// 玩家获胜次数
let playerWinCount = 0;
// 上一次玩家游戏动作
let lastPlayerAction = '';
// 玩家出相同动作的次数
let sameActionCount = 0;

const gameKoa = new koa();
gameKoa.use(async (ctx, next) => {
  if (playerWinCount >= 3) {
    ctx.status = 500;
    ctx.body = '我不玩了！GAME OVER';
    process.exit();
  }
  try {
    await next(); // 中间件
  } catch (error) {
    console.log('koa error :>> ', error);
  }
  // onion modal 洋葱模型，接收到 playerWon
  console.log('ctx.playerWon :>> ', ctx.playerWon);
  if (ctx.playerWon) {
    playerWinCount++;
  }
});

gameKoa.use(async (ctx, next) => {
  const {
    query: { action },
  } = ctx;
  const { point, computerAction } = game(action);
  ctx.status = 200;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (point === 0) {
        ctx.body = `平局 >> ${action} vs ${computerAction}`;
        ctx.playerWon = false;
      } else if (point === 1) {
        ctx.body = `你输了！>> ${action} vs ${computerAction}`;
        ctx.playerWon = false;
      } else {
        ctx.body = `你赢了！>> ${action} vs ${computerAction}`;
        ctx.playerWon = true; // playerWon 会挂在 ctx 上，传递给第一个函数
      }
      resolve();
      // reject(new Error('lala'));
    }, 500);
  });
});

app.use(mount('/game', gameKoa));

app.use(
  mount('/favicon.ico', ctx => {
    ctx.status = 200;
  }),
);

app.use(
  mount('/', async (ctx, next) => {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  }),
);

app.listen(port);
