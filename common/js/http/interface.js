/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import _config from '../config';
export default {
  config: {
    // baseUrl: "http://172.17.20.96:7758/",
    baseUrl: _config.domain.api,
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body_header: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    pic_header: {
      'Content-Type': 'multipart/form-data',
    },
    Auth_header: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: uni.getStorageSync('token'),
    },
    Auths_header: {
      'Content-Type': 'application/json;charset=UTF-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: uni.getStorageSync('token'),
    },
    data: {},
    method: 'GET',
    dataType: 'json',
    /* 如设为json，会对返回的数据做一次 JSON.parse */
    responseType: 'text',
    success() {},
    fail() {},
    complete() {},
  },
  interceptor: {
    request: null,
    response: null,
  },
  // let param = {
  // 	action: 'MemberLogin',
  // 	userBindName: '15068543161',
  // 	password: '123456'
  // }
  // this.post(url, param, options)
  request(options) {
    if (!options) {
      options = {};
    }
    uni.showLoading({
      title: '加载中',
      mask: true,
    });
    options.baseUrl = options.baseUrl || this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    options.url = options.baseUrl + options.url;
    options.data = options.data || {};
    options.method = options.method || this.config.method;
    // options.header=options.header||this.config.header
    //TODO 加密数据

    //TODO 数据签名
    /* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
    return new Promise((resolve, reject) => {
      let _config = null;
      options.complete = (response) => {
        let statusCode = response.statusCode;
        // console.log(statusCode)
        response.config = _config;
        if (process.env.NODE_ENV === 'development') {
          if (statusCode === 200) {
            //console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
          }
        }
        if (this.interceptor.response) {
          let newResponse = this.interceptor.response(response);
          if (newResponse) {
            response = newResponse;
          }
        }
        // 统一的响应日志记录
        //_reslog(response)
        if (statusCode === 200) {
          //成功
          uni.hideLoading();
          resolve(response);
          if (response.data.errcode == -1) {
            // uni.navigateTo({
            // 	url: '/pages/login/login'
            // })
          }
        } else {
          reject(response);
          uni.hideLoading();
          uni.showLoading({
            title: '网络出错了',
            icon: 'none',
          });
          setTimeout(function () {
            uni.hideLoading();
          }, 1000);
          // uni.navigateTo({
          // 	url: '/pages/login/login'
          // })
          return false;
        }
      };

      _config = Object.assign({}, this.config, options);
      _config.requestId = new Date().getTime();

      if (this.interceptor.request) {
        this.interceptor.request(_config);
      }

      // 统一的请求日志记录
      //_reqlog(_config)

      if (process.env.NODE_ENV === 'development') {
        //	console.log("【" + _config.requestId + "】 地址：" + _config.url)
        if (_config.data) {
          //	console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
        }
      }
      uni.request(_config);
    });
  },
  get(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'GET';
    return this.request(options);
  },
  post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    // data.token = uni.getStorageSync('token')
    options.data = data;
    options.method = 'POST';
    return this.request(options);
  },
  body_post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    options.header = this.config.body_header;
    return this.request(options);
  },
  pic_post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    options.header = this.config.pic_header;
    return this.request(options);
  },
  put(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'PUT';
    return this.request(options);
  },
  delete(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'DELETE';
    return this.request(options);
  },
  Auths_post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    options.header = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: uni.getStorageSync('token'),
    };
    // options.header = this.config.Auths_header;
    return this.request(options);
  },
  Auth_post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    // options.header = this.config.Auth_header;
    options.header = {
      // "Content-Type":"application/json",
    'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: uni.getStorageSync('token'),
    };
    return this.request(options);
  },
  add_post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'POST';
    // options.header = this.config.Auth_header;
    options.header = {
      "Content-Type":"application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: uni.getStorageSync('token'),
    };
    return this.request(options);
  },
  Auth_get(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = 'GET';
    // options.header = this.config.Auth_header;
    options.header = {
      'Content-Type': 'application/json;charset=UTF-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: uni.getStorageSync('token'),
    };
    return this.request(options);
  },
};

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  if (process.env.NODE_ENV === 'development') {
    //console.log("【" + req.requestId + "】 地址：" + req.url)
    if (req.data) {
      //console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
    }
  }
  //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
  let _statusCode = res.statusCode;
  if (process.env.NODE_ENV === 'development') {
    //console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
    if (res.config.data) {
      //	console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
    }
    //console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
  }
  //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
  switch (_statusCode) {
    case 200:
      break;
    case 401:
      break;
    case 404:
      break;
    default:
      break;
  }
}