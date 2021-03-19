const playerAction = process.argv[process.argv.length - 1];

const random = Math.random() * 3;

const getComputerAction = () => {
  if (random < 1) {
    return 'rock';
  }else if (random > 2) {
    return 'scissor';
  }else{
    return 'paper'
  }
}

const computerAction = getComputerAction()
console.log('computer :>> ', computerAction);

if (computerAction === playerAction) {
  console.log('结果 :>> ', '平局');
}else if (
  (computerAction === 'rock' && playerAction === 'scissor') 
  || (computerAction === 'scissor' && playerAction == 'paper')
  || (computerAction === 'paper' && playerAction == 'rock')
) {
  console.log('结果 :>> ', '你输了');
} else {
  console.log('结果 :>> ', '你赢了');
}