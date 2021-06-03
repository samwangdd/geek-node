# geek-node

使用 JS / NodeJS 实现的 Hybird 混合项目，使用技术栈包括但不限于：koa2，GraphQL，React

- 支持 SSR（服务端渲染）
- RPC 通信
- 服务端路由

## 运行

```shell
yarn
yarn:dev server # 启动服务端
yarn:dev client # 启动客户端
```

访问

- [1.下载页](http://localhost:3005/download/)
- [2.详情页](http://localhost:3005/detail/?columnid=123)
- [3.播放页](http://localhost:3005/play/)
- [4.列表页](http://localhost:3005/list/)

## 项目结构

```shell
.
├── README.md
├── commonjs      // CommonJS 模块规范
├── async         // 异步编程
├── http          // http 网络服务：koa/express
├── RPC           // RPC 通信相关
│   ├── buffer
│   ├── duplex
│   └── half-duplex
├── client        // BFF 层
│   ├── entry.js
│   ├── detail
│   ├── download
│   ├── list      // SSR 代码同构
│   ├── play
│   └── util
├── server        // 后端服务
│   ├── index.js
│   ├── detail
│   ├── lib
│   ├── list
│   └── play
├── performance   // 性能优化相关
│   ├── cluster
│   └── multiCore
├── refactor      // 重构
│   ├── backend     // 后端服务重构
│   ├── bff-server  // BFF 重构
│   └── business    // 业务代码重构
├── utils
│   ├── backend
│   └── server
├── package.json
└── yarn.lock
```
