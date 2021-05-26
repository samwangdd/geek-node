module.exports = {
  detail: {
    prot: 4000,
    ip: '127.0.0.1',
    protocol: 'geek-rpc',
    protobufPath: `${__dirname}/../../../constant/detail.proto`,
    requestStruct: 'ColumnRequest',
    responseStruct: 'ColumnResponse',
  },
  article: {
    protocol: 'http',
    url: 'http://127.0.0.1:4003',
    before: () => {},
    then: () => {},
    catch: () => {},
  },
};
