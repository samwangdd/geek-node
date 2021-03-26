const express = require('express');
const fs = require('fs');
const process = require('process');
const game = require('../../commonjs/game');
const app = express();
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

// express routing
app.get('/', (req, res) => {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});

app.get('/favicon', (req, res) => {
  res.status(200);
  return;
});

app.get(
  '/game',
  (req, res, next) => {
    if (playerWinCount >= 3) {
      res.status(500);
      res.send('我不玩了！GAME OVER');
      process.exit();
    }

    next(); // 中间件
    console.log('res.playerWon :>> ', res.playerWon);
    // onion modal 洋葱模型，接收到 playerWon
    if (res.playerWon) {
      playerWinCount++;
    }
  },
  (req, res) => {
    const {
      query: { action },
    } = req;
    const { point, computerAction } = game(action);
    setTimeout(() => {
      res.status(200);
      if (point === 0) {
        res.send(`平局 >> ${action} vs ${computerAction}`);
      } else if (point === 1) {
        res.send(`你输了！>> ${action} vs ${computerAction}`);
      } else {
        res.send(`你赢了！>> ${action} vs ${computerAction}`);
        res.playerWon = true; // playerWon 会挂在 res 上，传递给第一个函数
      }
    }, 500);
  },
);

app.listen(port);
