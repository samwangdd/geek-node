// 播放页，评论点赞功能
const fs = require('fs');
const protobuf = require('protocol-buffers');

const appRoot = process.cwd();
const schema = protobuf(fs.readFileSync(`${appRoot}/constant/comment.proto`));

const commentData = require('../../mock/comment');
const server = require('../lib/index')(schema.PraiseRequest, schema.PraiseResponse);
server
  .createServer((request, response) => {
    const commentid = request.body.commentid;
    const comment = commentData.filter(comment => comment.id == commentid)[0];
    let praiseNum = 0;

    if (comment) {
      comment.praiseNum++;
      praiseNum = comment.praiseNum;
    }
    response.end({
      commentid,
      praiseNum,
    });
  })
  .listen(4007, () => {
    console.log('rpc server listened : 4007');
  });
