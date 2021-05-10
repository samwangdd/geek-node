const listClient = require('./list-client');

module.exports = async function (sortType, filtType) {
  const data = await new Promise((resolve, reject) => {
    listClient.write(
      {
        sortType,
        filtType,
      },
      function (err, res) {
        err ? reject(err) : resolve(res.columns);
      },
    );
  });

  return data;
};
