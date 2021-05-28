// 业务逻辑
// 定义数据请求接口
const root = process.cwd();
module.exports = {
  column: {
    ip: '127.0.0.1',
    port: 4000,
    protocol: 'geek-rpc',
    protobufPath: `${root}/constant/detail.proto`,
    requestStruct: 'ColumnRequest',
    responseStruct: 'ColumnResponse',
    then(res) {
      return res.column;
    },
  },
  articleList: {
    protocol: 'http',
    url: 'http://127.0.0.1:4003',
    before: function (data) {
      return data;
    },
    then: function (res) {
      return res.data.list;
    },
    catch: () => {},
  },
};
