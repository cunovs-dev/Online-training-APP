/**
 * @author Lowkey
 * @date 2021/04/25 12:12:35
 * @Description:
 */
import { routerRedux } from 'dva/router';
import { login, sendLoginCode } from 'services/login';
import { Toast } from 'antd-mobile';
import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { setSession } from 'utils';

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
      const { phone, code = '' } = payload;
      const { data, success, msg } = yield call(login, { username: phone, code }, true);
      if (success) {
        const { userPwd, userId, userRealName: userName, userPhone, photoPath, voteUri } = data;
        setSession({
          userPwd,
          userId,
          userName,
          photoPath,
          userPhone,
          voteUri,
        });
        yield put(routerRedux.push({
          pathname: '/',
        }));
        yield put({
          type: 'updateState',
          payload: {
            buttonState: true,
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            buttonState: true,
          },
        });
        Toast.fail(msg);
      }
    },
    * sendLoginCode ({ payload }, { call, put }) {
      const { phone } = payload;
      const { success, msg, data } = yield call(sendLoginCode, { uname: phone });
      if (success) {
        Toast.offline(data.message);
      } else {
        Toast.fail(msg);
      }
    },
  },
  reducers: {
    disabled (state) {
      return state = !state;
    },
  },
});
