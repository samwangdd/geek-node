const axios = require('axios');
// const request = require('request');

let url = '';
module.exports = {
  compile: function (config) {
    url = config.url;
  },
  request: async function (config) {
    const res = await axios(url);
    return res.data;
  },
};
