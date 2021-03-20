console.log('lib :>> ');

exports.hello = 'test';

exports.add = function (a, b) {
  return a + b;
};

module.exports = function () {
  console.log('change :>> ');
};

setTimeout(() => {
  console.log('exports :>> ', exports);
}, 2000);
