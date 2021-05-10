process.on('message', res => {
  console.log('child res :>> ', res);
  process.send('23333');
});
