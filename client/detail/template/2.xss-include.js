const vm = require('vm');
const createTemplate = require('.');

const templateMap = {
  temp_a: "`Hi, I'm ${user.name} and ${user.age} years old, ${include('temp_b', {})}`",
  temp_b: '`<p>hello world!</p>`',
};

const context = vm.createContext({
  include: function (fileName, data) {
    const t = templateMap[fileName];
    return t(data);
  },
  _xss: markup => {
    if (!markup) return '';
    return String(markup)
      .replace(/&/g, '&amp')
      .replace(/</g, '&lt')
      .replace(/>/g, '&gt')
      .replace(/'/g, '&#39')
      .replace(/"/g, '&quot');
  },
});

const user = { name: 'sam', age: 22 };
console.log('templateMap :>> ', templateMap);

Object.keys(templateMap).forEach(key => {
  const myTemp = templateMap[key];
  templateMap[key] = vm.runInNewContext(
    `(function(data){
      with(data){
        return ${myTemp}
      }
    })`,
    context,
  );
});

console.log('templateMap :>> ', templateMap['temp_a']({ user }));
