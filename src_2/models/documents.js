import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { queryFile, queryFileType, queryFileList } from 'services/api';
import { Toast } from 'components';
import { model } from 'models/common';


const getDefaultPaginations = () => ({
  nowPage: 1,
  pageSize: 10,
});
const namespace = 'documents';
export default modelExtend(model, {
  namespace,
  state: {
    types: [],
    list: [],
    hasMore: false,
    paginations: getDefaultPaginations(),
    scrollerTop: 0,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/documents') {
          dispatch({
            type: 'updateState',
            payload: {
              list: [],
              refreshing: false,
              scrollTop: 0,
              paginations: getDefaultPaginations(),
            },
          });
          if (action === 'PUSH') {
            dispatch({
              type: 'queryList',
            });
            dispatch({
              type: 'queryFileType',
            });
          }
        }
      });
    },
  },
  effects: {
    * queryFileType ({ payload }, { call, put, select }) {
      const { success, data, msg = '获取数据失败，请稍后再试。' } = yield call(queryFileType, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            types: data.data,
          },
        });
      } else {
        Toast.fail(msg);
      }
    },
    * queryList ({ payload = {}, callback }, { call, put, select }) {
      const { isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, pageSize }, list } = _this,
        start = isRefresh ? getDefaultPaginations().nowPage : nowPage;
      const { success, data: res, msg = '获取数据失败，请稍后再试。' } = yield call(queryFileList, {
        ...payload,
        nowPage: start,
        pageSize,
      });
      if (success) {
        const { data = [] } = res;
        let newLists = [];
        newLists = start === getDefaultPaginations().nowPage ? data : [...list, ...data];
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
              list: newLists,
            },
          });
        }else {
          yield put({
            type: 'updateState',
            payload: {
              list: newLists,
            },
          });
        }
        if (callback) callback();
      } else {
        Toast.fail(msg || '获取失败');
      }
    },
    * queryFile ({ payload, callback }, { call }) {
      const { success, data, message = '获取数据失败，请稍后再试。' } = yield call(queryFile, payload);
      if (success) {
        if (callback) callback(data);
      } else {
        Toast.fail(message);
      }
    },
  },
});
