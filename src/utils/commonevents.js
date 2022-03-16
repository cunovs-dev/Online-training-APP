/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-24 11:18:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\utils\commonevents.js
 */
/**
 * @author Lowkey
 * @date 2021/04/25 10:52:15
 * @Description: 公共事件
 */

import { routerRedux } from 'dva/router';

/**
 *
 * @param path 路由
 * @param payload 参数
 * @param dispatch
 */
const handleGoto = (dispatch, path = '', payload = {}) => {
  dispatch(routerRedux.push({
    pathname: `/${path}`,
    query: payload,
  }));
};
const handleGridClick = ({ path = '', text = '', id, fetchType }, dispatch) => {
  if (path !== '') {
    if (path.startsWith('http')) {
      cnOpen(path);
    } else {
      dispatch(routerRedux.push({
        pathname: `/${path}`,
        query: {
          name: `${text}`,
          fetchType
        },
      }));
    }
  } else if (fetchType === 'cj') {
    dispatch(routerRedux.push({
      pathname: '/videoList',
      query: {
        name: `${text}`,
        id,
        fetchType,
      },
    }));
  }
};
const handleListClick = (data, dispatch) => {
  const { route = '', text = '' } = data;
  dispatch(routerRedux.push({
    pathname: `/${route}`,
    query: {
      name: `${text}`,
    },
  }));
};
const handlerCommonClick = (text = '', dispatch) => {
  /**
   * @author Lowkey
   * @date 2018/11/12 10:22:14
   * @Description: 跳转列表
   *
   */
  dispatch(routerRedux.push({
    pathname: '/commonlist',
    query: {
      name: `${text}`,
    },
  }));
};
const handleBuildingClick = (dispatch) => {
  dispatch(routerRedux.push({
    pathname: 'building',
  }));
};
module.exports = {
  handleListClick,
  handleGoto,
  handleGridClick,
  handlerCommonClick,
  handleBuildingClick,
};
