const fs = require('fs');

const data = fs.readFileSync(__dirname + '/../business/play/data.js', 'utf-8');
// const data = async () =>
//   await new Promise(resolve => {
//     fs.readFile(__dirname + '/../business/play/data.js', 'utf-8', (err, res) => {
//       resolve(res);
//     });
//   });
const template = fs.readFileSync(__dirname + '/../business/play/template.htm', 'utf-8');
// const template = async () =>
//   await new Promise(resolve =>
//     fs.readFile(__dirname + '/../business/play/template.htm', 'utf-8', (err, res) => {
//       resolve(res);
//     }),
//   );
module.exports = {
  '/play': {
    data,
    template,
  },
  // '/detail': async function () {
  //   return 'detail page';
  // },
};
