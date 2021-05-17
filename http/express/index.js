const fs = require('fs');
const process = require('process');
const express = require('express');
const game = require('../../commonjs/game');
const app = express();
const port = 3002;

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

app.get('/favicon', (req, res) => {
  res.status(200);
  return;
});

app.get(
  '/game',
  (req, res, next) => {
    console.log('first :>> ');
    if (playerWinCount >= 3) {
      res.status(500);
      res.send('我不玩了！GAME OVER');
      process.exit();
    }
    next(); // 中间件
    console.log('first end:>> ');
    // 无法获取到 res.playerWon
    console.log('res.playerWon :>> ', res.playerWon);
    // onion modal 洋葱模型，接收到 playerWon
    if (res.playerWon) {
      playerWinCount++;
    }
  },
  async (req, res) => {
    console.log('secened :>> ');
    const {
      query: { action },
    } = req;
    const { point, computerAction } = game(action);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        res.status(200);
        if (point === 0) {
          res.send(`平局 >> ${action} vs ${computerAction}`);
          res.playerWon = false;
        } else if (point === 1) {
          res.send(`你输了！>> ${action} vs ${computerAction}`);
          res.playerWon = false;
        } else {
          res.send(`你赢了！>> ${action} vs ${computerAction}`);
          res.playerWon = true; // playerWon 会挂在 res 上，传递给第一个函数
        }
        resolve();
      }, 500);
    });
    console.log('secened end :>> ');
  },
);

// express routing
app.get('/', (req, res) => {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});

app.listen(port);
