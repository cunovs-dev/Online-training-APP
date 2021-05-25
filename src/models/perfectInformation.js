import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
// import { queryFolder } from 'services/resource';
import { Toast } from 'components';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'perfectInformation',
  state: {
    list: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/perfectInformation') {
          dispatch({
            type: 'updateState',
            payload: {
              contents: []
            },
          });
          if (action === 'PUSH') {
            dispatch({
              type: 'query',
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      // const { success, data, message = '获取数据失败，请稍后再试。' } = yield call(queryFolder, payload);
      if (1) {
        yield put({
          type: 'updateState',
          payload: {
            list: []
          }
        });
      } else {
        // Toast.fail(message);
      }
    },
  },
});
