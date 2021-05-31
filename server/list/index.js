const fs = require('fs');
const protobuf = require('protocol-buffers');
const appRoot = process.cwd();
const schemas = protobuf(fs.readFileSync(`${appRoot}/constant/list.proto`));

const columnData = require('../../mock/column');
const server = require('../lib/index')(schemas.ListRequest, schemas.ListResponse);

server
  .createServer((req, res) => {
    const { sortType, filtType } = req.body;

    res.end({
      columns: columnData
        .sort((a, b) => {
          if (sortType == 1) {
            return a.id - b.id;
          } else if (sortType == 2) {
            return a.sub_count - b.sub_count;
          } else if (sortType == 3) {
            return a.column_price - b.column_price;
          }
        })
        .filter(item => {
          if (filtType == 0) {
            return item;
          } else {
            return item.type == filtType;
          }
        }),
    });
  })
  .listen(3006, () => {
    console.log('RPC start at  :>> ', 3006);
  });
