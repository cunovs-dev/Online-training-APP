import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { queryUserInfo } from 'services/api';
import { model } from 'models/common';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'mine',
  state: {
    info: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/mine') {
          dispatch({
            type: 'queryUserInfo',
          });
        }
      });
    }
    ,
  },
  effects: {
    * queryUserInfo ({ payload }, { call, put }) {
      const { data, success, msg } = yield call(queryUserInfo, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            info: data,
          },
        });
      } else {
        Toast.fail(msg);
      }
    },
  },

});
