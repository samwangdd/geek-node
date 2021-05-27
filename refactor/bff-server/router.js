const fs = require('fs');

const data = async () => await fs.readFile(__dirname + '/../business/play/data.js', 'utf-8');
const template = async () => await fs.readFile(__dirname + '/../business/play/template.htm', 'utf-8');
module.exports = {
  '/play': {
    data,
    template,
  },
  // '/detail': async function () {
  //   return 'detail page';
  // },
};
