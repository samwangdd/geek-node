const fs = require('fs');
const protobuf = require('protocol-buffers');
const schemas = protobuf(fs.readFileSync(`${__dirname}/../../constant/detail.proto`));

const columnData = require('../mockdata/column');

const server = require('../lib/index')(schemas.ColumnRequest, schemas.ColumnRequest);

server
  .createServer((request, response) => {
    const columnid = request.body;
    console.log('columnid :>> ', columnid);
    response.end({
      column: columnData[0],
      recommendColumns: [columnData[1], columnData[2]],
    });
  })
  .listen(4005, () => {
    console.log('rpc server listened : 4005 >> ');
  });
