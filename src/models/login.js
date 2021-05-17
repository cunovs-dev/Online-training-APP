/**
 * @author Lowkey
 * @date 2021/04/25 12:12:35
 * @Description:
 */
import { routerRedux } from 'dva/router';
import { login, SendValidateCode } from 'services/login';
import { Toast } from 'antd-mobile';
import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { setLoginIn } from 'utils';

const MD5 = require('md5'),
  encrypt = (word) => {
    return MD5(word, 'hex');
  };

export default modelExtend(pageModel, {
  namespace: 'login',

  state: {
    state: true,
    loadPwd: '',
    buttonState: true, // 登录按钮状态
  },
  subscriptions: {
    setup ({ dispatch, history }) {

    },
  },
  effects: {
    * login ({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          buttonState: false,
        },
      });
      const { from = '/', ...params } = payload,
        { usrPwd = '' } = params;
      // const data = yield call(login, Object.assign({}, params, { usrPwd: encrypt(usrPwd) }), true);
      yield put(routerRedux.push({
        pathname: '/',
      }));
      yield put({
        type: 'updateState',
        payload: {
          buttonState: true,
        },
      });
    },
    * SendValidateCode ({ payload }, { call, put }) {
      const { phoneNum } = payload;
      const data = yield call(SendValidateCode, { phoneNum });
      if (data) {
        console.log(data);
      }
    },
  },
  reducers: {
    disabled (state) {
      return state = !state;
    },
  },
});
