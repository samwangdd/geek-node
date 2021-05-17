const Express = require('express');
const app = new Express();

app.use(async (req, res, next) => {
  console.log('first');
  await next();
  console.log('fist end');
});

app.use(async (req, res, next) => {
  res.status = 200;
  console.log('seconded');
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('wait 500ms :>> ');
      resolve();
    }, 500);
  });
  console.log('seconded end');
});

app.listen(3004);
