/* global window */
import config from './config';
import request from './request';
import cookie from './cookie';
import defaultImg from 'themes/images/default/default.png';
import defaultUserIcon from 'themes/images/default/userIcon.jpg';
import formsubmit from './formsubmit';


const { userTag: { userName, userToken, userId, photoPath }, baseURL } = config,
  { _cs, _cr, _cg } = cookie;
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1')
    .toLowerCase();
};

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length));
    }
  }
  return format;
};

const getImages = (path = '', type = 'defaultImg') => {
  if (path instanceof Blob || path.startsWith('blob:')) {
    return path;
  }
  if (path === '' || !path) {
    return type === 'defaultImg' ? defaultImg : defaultUserIcon;
  }
  return path.startsWith('http://') || path.startsWith('https://') ? path
    : (config.baseURL + (path.startsWith('/') ? '' : '/') + path);
};

const getErrorImg = (el, type = 'defaultImg') => {
  if (el && el.target) {
    el.target.src = type === 'defaultImg' ? defaultImg : defaultUserIcon;
    el.target.onerror = null;
  }
};

const setLoginOut = () => {
  _cr(userName);
  _cr(userToken);
  _cr(userId);
  _cr(photoPath);
  _cr('vocationalList');
  _cr('sceneList');
};

const setSession = (obj) => {
  Object.keys(obj)
    .map(keys => {
      if (obj[keys]) {
        _cs(keys, obj[keys]);
      }
    });
};

const getLocalIcon = (icon) => {
  const regex = /\/([^\/]+?)\./g;
  let addIconName = [];
  if (icon.startsWith('/') && (addIconName = regex.exec(icon)) && addIconName.length > 1) {
    const addIcon = require(`svg/${icon.substr(1)}`);
    return `${addIconName[1]}`;
  }
  return icon;
};

const pattern = (type) => {
  const obj = {};
  obj.href = /[a-zA-z]+:\/\/[^\\">]*/g;
  obj.svg = /mymobile/ig;
  obj.phone = /^1\d{10}$/;
  obj.email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  obj.password = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,12}$/; //6-12 数字、字母、特殊字符
  return obj[type];
};

/**
 *
 * @param el 当前元素
 * @returns {number} 父元素不是body时元素相对body的offsetTop
 */
const getOffsetTopByBody = (el) => {
  let offsetTop = 0;
  while (el && el.tagName !== 'BODY') {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return offsetTop;
};

const renderSize = (fileSize) => {
  if (fileSize < 1024) {
    return `${fileSize}B`;
  } else if (fileSize < (1024 * 1024)) {
    let temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return `${temp}KB`;
  } else if (fileSize < (1024 * 1024 * 1024)) {
    let temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return `${temp}MB`;
  }
  let temp = fileSize / (1024 * 1024 * 1024);
  temp = temp.toFixed(2);
  return `${temp}GB`;
};
const getCommonDate = (date, details = true, showWeek = true) => {
  if (date) {
    let preDate = new Date(date),
      week = '日一二三四五六'.charAt(preDate.getDay()),
      year = preDate.getFullYear(),
      hour = preDate.getHours() < 10 ? `0${preDate.getHours()}` : preDate.getHours(),
      minutes = preDate.getMinutes() < 10 ? `0${preDate.getMinutes()}` : preDate.getMinutes();
    if (details) {
      if (!showWeek) {
        return `${year}年${preDate.getMonth() + 1}月${preDate.getDate()}日${hour}:${minutes}`;
      }
      return `${year}年${preDate.getMonth() + 1}月${preDate.getDate()}日 星期${week} ${hour}:${minutes}`;
    }
    return `${year}年${preDate.getMonth() + 1}月${preDate.getDate()}日`;
  }
};
/**
 *
 * @param id
 * @param priority 优先级 默认业务
 * @returns {*}
 */
const getVideoTips = (id, priority = 'yw') => {
  const vocationalList = _cg('vocationalList') && JSON.parse(_cg('vocationalList'));
  const sceneList = _cg('vocationalList') && JSON.parse(_cg('sceneList'));
  let ywRes = '',
    cjRes = '';
  if (Array.isArray(vocationalList) && vocationalList.find(item => item.id === id)) {
    ywRes = vocationalList.find(item => item.id === id).title || '';
  }
  if (Array.isArray(sceneList) && sceneList.find(item => item.id === id)) {
    cjRes = sceneList.find(item => item.id === id).title || '';
  }
  if (priority === 'yw') {
    return ywRes !== '' ? ywRes : cjRes;
  } else {
    return cjRes !== '' ? cjRes : ywRes;
  }
};

const filterArr = (arr1 = [], arr2 = []) => {
  if (arr1.length > 0 && arr2.length > 0) {
    const res = [];
    arr1.map(item => {
      if (arr2.find(ev => ev.id === item)) {
        res.push(arr2.find(ev => ev.id === item));
      }
    });
    return res;
  }
  return [];
};

module.exports = {
  config,
  request,
  cookie,
  getErrorImg,
  getImages,
  getOffsetTopByBody,
  getLocalIcon,
  formsubmit,
  setLoginOut,
  pattern,
  filterArr,
  getVideoTips,
  renderSize,
  getCommonDate,
  setSession,
};
