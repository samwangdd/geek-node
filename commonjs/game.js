module.exports = function (playerAction) {
  const random = Math.random() * 3;

  const getComputerAction = () => {
    if (random < 1) {
      return 'rock';
    } else if (random > 2) {
      return 'scissor';
    } else {
      return 'paper';
    }
  };

  const computerAction = getComputerAction();
  console.log('computer :>> ', computerAction);

  let point; // 电脑得分
  if (computerAction === playerAction) {
    console.log('结果 :>> ', '平局');
    point = 0;
  } else if (
    (computerAction === 'rock' && playerAction === 'scissor') ||
    (computerAction === 'scissor' && playerAction == 'paper') ||
    (computerAction === 'paper' && playerAction == 'rock')
  ) {
    console.log('结果 :>> ', '你输了');
    point = 1;
  } else {
    console.log('结果 :>> ', '你赢了');
    point = -1;
  }
  return { point, computerAction };
};
