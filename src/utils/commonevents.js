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
const handleGoto = (dispatch, path = '', payload) => {
  dispatch(routerRedux.push({
    pathname: `/${path}`,
    query: payload,
  }));
};
const handleGridClick = ({ path = '', text = '' }, dispatch) => {
  dispatch(routerRedux.push({
    pathname: `/${path}`,
    query: {
      name: `${text}`,
    },
  }));
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
    pathname: `/commonlist`,
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
