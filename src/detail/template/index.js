const fs = require('fs');
const vm = require('vm');

const templateMap = {};
// vm 模块可以在 v8 虚拟机上下文中编译、保存、执行代码
// 通过 vm 创建一个上下文对象
const context = vm.createContext({
  include: function (fileName, data) {
    const template = templateMap[fileName] || createTemplate(fileName);
    return template(data);
  },
});

function createTemplate(fileName) {
  // vm 在 v8 context上下文中执行以下代码
  templateMap[fileName] = vm.runInContext(
    `(function(data){
        with(data){
          return \`${fs.readFileSync(fileName, 'utf-8')}\`
        }
    })`,
    context,
  );
  return templateMap[fileName];
}

module.exports = createTemplate;
