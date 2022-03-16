import { hashHistory } from 'react-router';
import axios from 'axios';
import qs from 'qs';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { Toast } from 'antd-mobile';
import { _cg, _cr } from './cookie';
import { baseURL, userTag } from './config';

const { userName, userId, userToken, photoPath } = userTag;
const loginOut401 = () => {
  _cr(userName);
  _cr(userToken);
  _cr(userId);
  _cr(photoPath);
  _cr('vocationalList');
  _cr('sceneList');
};

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const doDecode = (json) => {
  return eval(`(${json})`);
};
const fetch = (options) => {
  const token = _cg(userToken)
    .split(',');
  axios.interceptors.request.use(
    config => {
      if (token.length === 2) {
        config.headers[token[0]] = token[1];
      }

      return config;
    },
    err => Promise.reject(err),
  );
  let {
    method = 'get',
    data,
    url,
  } = options;

  const appendParams = {};
  // appendParams[usertoken] = _cg(usertoken)

  const cloneData = lodash.cloneDeep({ ...data, ...appendParams });

  try {
    let domin = '';
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    Toast.offline(e.message);
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: cloneData });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(
        url,
        qs.stringify(cloneData, { indices: false }));
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

const getResponeseErrMsg = (status) => {
  let msg = '未知错误';
  if (status > 199 && status < 300) {
    return '';
  }
  switch (status) {
    case 500:
      msg = '服务器发生未知错误.';
      break;
    case 403:
      msg = '访问服务器被拒绝';
      break;
    case 404:
      msg = '未找到请求的页面';
      break;
    case 405:
      msg = '不允许访问本页面的当前方法';
      break;
    case 408:
    case -1:
      msg = '访问超时';
      break;
    case 502:
      msg = '无法连接';
      break;
    case 504:
    case 0:
    case undefined:
      msg = '网络已断开,不能连接到服务器';
      break;
    default:
      msg = `系统错误,错误代码:${status}`;
  }
  return msg;
};

export default function request (options) {
  return fetch(options)
    .then((response) => {
      const { statusText, status } = response;
      let data = response.data;
      typeof (data) === 'string' && (data = doDecode(data));
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...data,
      });
    })
    .catch((error) => {
      if (options.serverError === true) {
        return response;
      }
      // hashHistory.push(`/error`)
      let msg;
      let statusCode;
      const { response = {} } = error;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        if (statusCode === 401) {
          loginOut401();
          hashHistory.replace('/login');
        }
        msg = getResponeseErrMsg(statusCode) || statusText;
      }
      return Promise.reject({ success: false, statusCode, message: msg });
    });
}
