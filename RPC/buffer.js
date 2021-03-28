// const buf1 = Buffer.alloc(10);
// const buf2 = Buffer.from('samdd', 'utf-8');
// const buf3 = Buffer.from([2, 3, 4]);
// console.log('buf1 :>> ', buf1);
// console.log('buf2 :>> ', buf2);
// console.log('buf3 :>> ', buf3);

const protobuf = require('protocol-buffers');
const fs = require('fs');

// 调用编解码 buffer 方法，方便定义 buffer
const buffers = protobuf(fs.readFileSync('../buffer.proto'));
const { Columns } = buffers;

const buf = Columns.encode({
  id: 1,
  name: 'nodejs',
  price: 99.9,
});

console.log('buf :>> ', buf);

const obj = Columns.decode(buf);
console.log('obj :>> ', obj);
