const vm = require('vm');

const context = vm.createContext({});

// 接受模版内容作为参数
function createTemplate(content) {
  return vm.runInNewContext(
    `(function (data) {
      with(data) {
        return \`${content}\`;
      }
    })`,
    context,
  );
}

module.exports = createTemplate;
