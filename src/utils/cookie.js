/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-13 09:43:23
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\utils\cookie.js
 */

import Cookie from 'js-cookie';
import { userTag } from './config';

const { userToken } = userTag,
  has = () => typeof (localStorage) !== 'undefined',
  set = (key, value) => {
    if (has) {
      localStorage.setItem(key, value);
    }
  },
  get = (key) => {
    let rs = '';
    if (has) {
      rs = localStorage.getItem(key);
    }
    return rs || '';
  },
  remove = (key) => {
    if (has) {
      localStorage.removeItem(key);
    }
  };

export const _cs = (key, value, expire) => {
  /*  Cookie.set(key, value, {
      path: '/',
      expires: 365,
    }) */
  set(key, value);
};

export const _cr = (key) => {
  Cookie.remove(key, {
    path: '/',
  });
  remove(key);
};

export const _cg = (key) => {
  const cf = userToken !== key, // 先从cookie中获取
    v = cf ? Cookie.get(key) : get(key);
  return v && v !== 'undefined' ? v : ((cf ? get(key) : Cookie.get(key)) || '');
};

export const _cgj = key => (Cookie.getJSON(key) || {});

export default {
  _cs,
  _cr,
  _cg,
  _cgj,
};
