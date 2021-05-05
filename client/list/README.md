** client/list **
包含 浏览器 及 ** node bff 层服务端 ** 渲染的代码

* 在使用 react ssr 时，服务端需要将 DOM 转为 virtual DOM，再转为 string，其性能并没有模版引擎高。