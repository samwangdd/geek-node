const vm = require('vm');

const myTemp = "`Hi, I'm ${user.name} and ${user.age} years old`";

const myContext = vm.createContext({}); // 创建上下文对象

const createTemp = vm.runInContext(
  `(function(data){
    with(data){
      return ${myTemp}
    }
  })`,
  myContext,
);

const user = { name: 'sam', age: 22 };
console.log('createTemp :>>', createTemp({ user }));
