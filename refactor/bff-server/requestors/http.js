const axios = require('axios');

module.exports = {
  compile: function (config) {
    return config.url;
  },
  request: function (config) {
    return new Promise((resolve, reject) => {
      axios(url)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  },
};
