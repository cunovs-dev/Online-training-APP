/*
 * @Author: your name
 * @Date: 2021-12-15 15:28:27
 * @LastEditTime: 2021-12-16 14:17:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\models\praise.js
 */
import { parse } from 'qs';
import { model } from 'models/common';
import { Toast } from 'components';
import modelExtend from 'dva-model-extend';
import { queryPraise } from 'services/querylist';

const getDefaultPaginations = () => ({
  nowPage: 1,
  pageSize: 10,
});
const namespace = 'praise';
export default modelExtend(model, {
  namespace,
  state: {
    listData: [],
    refreshing: false,
    scrollTop: 0,
    paginations: getDefaultPaginations(),
    hasMore: true,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/praise') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                listData: [],
                refreshing: false,
                scrollTop: 0,
                paginations: getDefaultPaginations(),
              },
            });
            dispatch({
              type: 'queryList'
            });
          }
        }
      });
    },
  },

  effects: {
    * queryList ({ payload = {}, callback }, { call, put, select }) {
      const { isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, pageSize }, listData } = _this,
        start = isRefresh ? getDefaultPaginations().nowPage : nowPage;
      const { success, data: res, msg = '获取数据失败，请稍后再试。' } = yield call(queryPraise, {
        ...payload,
        nowPage: start,
        pageSize,
      });
      if (success) {
        const { data = [] } = res;
        let newLists = [];
        newLists = start === getDefaultPaginations().nowPage ? data : [...listData, ...data];
        yield put({
          type: 'updateState',
          payload: {
            hasMore: data.length === getDefaultPaginations().pageSize,
          },
        });
        if (data.length !== 0) {
          yield put({
            type: 'updateState',
            payload: {
              paginations: {
                ..._this.paginations,
                nowPage: start + 1,
              },
              listData: newLists,
            },
          });
        }
        if (callback) callback();
      } else {
        Toast.fail(msg || '获取失败');
      }
    },
  },
});
