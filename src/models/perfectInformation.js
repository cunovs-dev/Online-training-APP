import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { setInformationApi } from 'services/api';
import { Toast } from 'components';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'perfectInformation',
  effects: {
    * setInformationApi ({ payload, callback }, { call, put }) {
      const { success, msg = '请稍后再试' } = yield call(setInformationApi, payload);
      if (success) {
        if (callback) callback();
      } else {
        Toast.fail(msg);
      }
    },
  },
});
