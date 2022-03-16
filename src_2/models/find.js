import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { search } from 'services/querylist';
import { Toast } from 'components';
import { model } from 'models/common';

const getDefaultPaginations = () => ({
  nowPage: 1,
  pageSize: 10,
});
const namespace = 'find';
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
        if (pathname === '/find') {
          dispatch({
            type: 'updateState',
            payload: {
              listData: [],
              refreshing: false,
              scrollTop: 0,
              paginations: getDefaultPaginations(),
            },
          });
        }
      });
    },
  },
  effects: {
    * search ({ payload, callback }, { call, put, select }) {
      const { isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, pageSize }, listData } = _this,
        start = isRefresh ? getDefaultPaginations().nowPage : nowPage;
      const { success, data: res, msg = '获取数据失败，请稍后再试。' } = yield call(search, {
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
