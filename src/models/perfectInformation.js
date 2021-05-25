import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { setInformationApi } from 'services/api';
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

        }
      });
    },
  },
  effects: {
    * setInformationApi ({ payload }, { call, put, select }) {
      const { success, data, msg = '请稍后再试' } = yield call(setInformationApi, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            list: []
          }
        });
      } else {
        Toast.fail(msg);
      }
    },
  },
});
