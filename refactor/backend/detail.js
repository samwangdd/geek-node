const fs = require('fs');
const protobuf = require('protocol-buffers');

const schemas = protobuf(fs.readFileSync(`${__dirname}/../../constant/detail.proto`));
const RPCServer = require('../../utils/backend/makeRPC')(schemas.ColumnRequest, schemas.ColumnResponse);
const columnData = require('../../mock/column');

RPCServer.createServer((req, res) => {
  const columnId = req.body;

  res.end({
    column: columnData[0],
    recommendColumns: [columnData[1], columnData[2]],
  });
}).listen(4000, () => {
  console.log('detail server listened :>> ', 4000);
});
