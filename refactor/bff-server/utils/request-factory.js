let requestors = {};

/**
 * 请求工厂函数
 * 接收请求配置，创建 RPC/HTTP 服务
 *
 * @param {*} config
 * @return {*}
 */
function factory(config) {
  if (!requestors[config.protocol]) {
    throw new Error(`暂不支持此协议：${config.protocol}`);
  }

  // 定义 hooks
  config.before = config.before || (d => d);
  config.then = config.then || (d => d);
  config.catch = config.catch || (d => d);

  // 初始化/编译 requestor
  requestors[config.protocol].compile(config);

  // 返回一个函数
  return async function (data) {
    try {
      data = config.before(data);
    } catch (error) {
      config.catch(error);
      return Promise.resolve(null);
    }

    return {
      // 请求协议，返回数据及后续处理
      result: await requestors[config.protocol].request(data).then(config.then).catch(config.catch),
    };
  };
}

// 注册协议
factory.registerProtocol = function (protocol, requestor) {
  requestors[protocol] = requestor;
};

module.exports = factory;
