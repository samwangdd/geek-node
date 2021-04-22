# geek-node
使用 JS / NodeJS 实现的 Hybird 混合项目，使用技术栈包括但不限于：koa2，GraphQL，React

* 支持 SSR（服务端渲染）
* RPC 通信
* 服务端路由

## 运行
```shell
yarn
yarn server # 启动服务端
yarn client # 启动客户端
```
访问 localhost:3005

## 项目结构
```shell
.
├── README.md
├── buffer.proto
├── index.js
├── client
│   ├── index.js
│   ├── detail
│   ├── download
│   ├── list
│   └── play
├── server
│   ├── index.js
│   ├── detail
│   ├── lib
│   │   ├── index.js
│   │   └── rpc-server.js
│   └── mockdata
├── constant
│   ├── common.js
│   └── detail.proto
├── package.json
└── yarn.lock
```