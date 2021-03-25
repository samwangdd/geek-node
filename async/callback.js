// const promise = new Promise((resolve, reject) => {
//   if (Math.random() < 0.7) {
//     resolve();
//   } else {
//     reject();
//   }
// });

const fs = require('fs');

const readFilePromise = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'UTF-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = readFilePromise;
