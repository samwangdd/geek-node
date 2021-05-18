// 利用 ES6 模板字符串实现模板引擎
const vm = require('vm');

const templateMap = {
  templateA: '`<h2>${include("templateB")}</h2>`',
  templateB: '`<p>hello world!</p>`',
};

const context = {
  // 实现模版嵌套
  include: function (name) {
    // TODO: 这里为什么是函数？？
    return templateMap[name]();
  },
  // 实现 xss 过滤
  _xss: markup => {
    if (!markup) return '';
    return String(markup)
      .replace(/&/g, '&amp')
      .replace(/</g, '&lt')
      .replace(/>/g, '&gt')
      .replace(/'/g, '&#39')
      .replace(/"/g, '&quot');
  },
};

// 遍历 object 生成函数
Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key];
  templateMap[key] = vm.runInNewContext(
    // TODO: 这里为什么返回函数？？
    `(function(){
      return ${temp}
    })`,
    context,
  );
});

console.log('vm.runInNewContext :>> ', templateMap['templateA']());
