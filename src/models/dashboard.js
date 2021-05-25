import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import * as Services from 'services/querylist';
import { validInformation } from 'services/login';
import { routerRedux } from 'dva/router';
import { defaultSceneIcon } from 'utils/defaults';
import { Toast } from 'components';
import { model } from 'models/common';

const getGird = (data) => {
  const res = [];
  data.map(item => {
    res.push({
      ...item,
      text: item.title,
      icon: item.iconUri || defaultSceneIcon[Number(item.id)],
    });
  });
  return res;
};
export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    posterData: [],
    recommendData: [],
    newCourse: [],
    listData: [],
    requiredData: [],
    selectKey: 0,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({
            type: 'validInformation',
          });
        }
      });
    },
  },
  effects: {
    * validInformation ({ payload }, { call, put }) {
      const { data, success, msg } = yield call(validInformation, payload);
      if (success) {
        const { isValid, cj, yw } = data;
        if (!isValid) {
          yield put(routerRedux.push({
            pathname: '/perfectInformation',
          }));
          yield put({
            type: 'app/updateState',
            payload: {
              vocationalList: yw.data,
              sceneList: cj.data,
            },
          });
        } else {
          yield put({
            type: 'app/updateState',
            payload: {
              vocationalList: yw.data,
              sceneList: getGird(cj.data),
            },
          });
          yield put({
            type: 'query',
          });
        }
      } else {
        Toast.fail(msg);
      }
    },
    * query ({ payload }, { put, call }) {
      const [poster, recommend, requiredCourses] = yield ([
        call(Services.queryPoster),
        call(Services.queryRecommend),
        call(Services.queryRequiredCourses),
      ]);
      if (poster.success) {
        const { data } = poster;
        yield put({
          type: 'updateState',
          payload: {
            posterData: data.data,
          },
        });
      }
      if (recommend.success) {
        const { data } = recommend;
        yield put({
          type: 'updateState',
          payload: {
            recommendData: data.data,
          },
        });
      }
      if (requiredCourses.success) {
        const { data } = requiredCourses;
        yield put({
          type: 'updateState',
          payload: {
            requiredData: data.data,
          },
        });
      }
    },
    * queryList ({ payload }, { call, put }) {
      const { data, success } = yield call(Services.queryVideoList, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            listData: data.data,
          },
        });
      }
    },
  },
});
