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
  // console.log('computer :>> ', computerAction);

  let point; // η΅θεΎε
  if (computerAction === playerAction) {
    point = 0;
  } else if (
    (computerAction === 'rock' && playerAction === 'scissor') ||
    (computerAction === 'scissor' && playerAction == 'paper') ||
    (computerAction === 'paper' && playerAction == 'rock')
  ) {
    point = 1;
  } else {
    point = -1;
  }
  return { point, computerAction };
};
