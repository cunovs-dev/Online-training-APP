/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:28
 * @LastEditTime: 2021-12-15 16:08:38
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\models\videoList.js
 */
import { parse } from 'qs';
import { model } from 'models/common';
import { Toast } from 'components';
import modelExtend from 'dva-model-extend';
import * as Services from 'services/querylist';

const getDefaultPaginations = () => ({
  nowPage: 1,
  pageSize: 10,
});
const namespace = 'videoList';
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
        const { fetchType = '', id } = query;
        if (pathname === '/videoList') {
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
              type: 'fetch',
              payload: {
                fetchType,
                id,
              },
            });
          }
        }
      });
    },
  },

  effects: {
    * fetch ({ payload, callback }, { call, put, select }) {
      const { fetchType, isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, pageSize }, listData } = _this,
        start = isRefresh ? getDefaultPaginations().nowPage : nowPage;
      let result;
      if (fetchType === 'cj') {
        result = yield call(Services.queryVideoList, { ...payload, type: fetchType, nowPage: start, pageSize });
      }
      if (fetchType === 'recommend') {
        result = yield call(Services.queryRecommend, { ...payload, nowPage: start, pageSize });
      }
      if (fetchType === 'required') {
        result = yield call(Services.queryRequiredCourses, { ...payload, nowPage: start, pageSize });
      }
      // if (fetchType === 'history') {
      //   result = yield call(Services.queryHistory, { nowPage: start, pageSize });
      // }

      const { data: res, success, msg } = result;
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
