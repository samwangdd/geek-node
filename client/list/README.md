**client/list**

包含 **浏览器** 及 **node bff 层服务端** 代码

```js
.
├── README.md
├── browser               // 客户端业务代码
│   ├── index.jsx
│   └── webpack.config.js
├── components            // 跨端公共组件
│   ├── column_item.jsx
│   └── container.jsx
└── node-bff
    ├── index.js        // bff 服务
    ├── app.jsx         // react 组件
    ├── get-data.js     // 获取列表数据
    ├── list-client.js  // 创建 list socket
    ├── index.htm       // html 模版
    └── source
```

**TODO**

- 在使用 react ssr 时，服务端需要将 DOM 转为 virtual DOM，再转为 string，其性能并没有模版引擎高。
