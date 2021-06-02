const fs = require('fs');
const protobuf = require('protocol-buffers');

const appRoot = process.cwd();
const schema = protobuf(fs.readFileSync(`${appRoot}/constant/list.proto`));
const createSocket = require(`${appRoot}/utils/server/createSocket`);

module.exports = createSocket({
  port: 3006,
  schema: schema,
  schemaKey: ['ListRequest', 'ListResponse'],
  timeout: 6000,
});
