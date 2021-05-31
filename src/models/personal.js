import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { queryDirection } from 'services/app';
import { Toast } from 'components';
import { filterArr } from 'utils';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'personal',
  state: {
    vocationalList: [],
    sceneList: [],
    weaknessList: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname } = location;
        if (pathname.startsWith('/personal')) {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query (_, { call, put, select }) {
      const app = yield select(_ => _['app']);
      const { vocationalList, sceneList, weaknessList } = app;
      const { data, success, msg } = yield call(queryDirection);
      if (success) {
        const { yw, cj, fl } = data;
        yield put({
          type: 'updateState',
          payload: {
            vocationalList: filterArr(yw, vocationalList),
            sceneList: filterArr(cj, sceneList),
            weaknessList: weaknessList.find(item => item.id === fl) ? [weaknessList.find(item => item.id === fl)] : [],
          },
        });
      } else {
        Toast.fail(msg);
      }
    },
  },

});
