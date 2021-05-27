import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import * as Services from 'services/querylist';
import { validInformation } from 'services/login';
import { routerRedux } from 'dva/router';
import { defaultSceneIcon } from 'utils/defaults';
import { Toast } from 'components';
import { model } from 'models/common';

const getDefaultPaginations = () => ({
  nowPage: 1,
  pageSize: 10,
});
const namespace = 'dashboard';
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
  namespace,
  state: {
    posterData: [],
    recommendData: [],
    newCourse: [],
    listData: [],
    requiredData: [],
    selectKey: 0,
    refreshing: false,
    scrollTop: 0,
    paginations: getDefaultPaginations(),
    hasMore: true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                posterData: [],
                recommendData: [],
                newCourse: [],
                listData: [],
                requiredData: [],
                selectKey: 0,
                scrollerTop: 0,
              },
            });
          }
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
        const { isValid, cj, yw, fl, self } = data;
        if (!isValid) {
          yield put(routerRedux.push({
            pathname: '/perfectInformation',
          }));
          yield put({
            type: 'app/updateState',
            payload: {
              vocationalList: yw.data,
              sceneList: cj.data,
              weaknessList: fl.data,
              selfChoice:self
            },
          });
        } else {
          yield put({
            type: 'app/updateState',
            payload: {
              vocationalList: yw.data,
              sceneList: getGird(cj.data),
              weaknessList: fl.data,
              selfChoice:self
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
    * queryList ({ payload, callback }, { call, put, select }) {
      const { isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, pageSize }, listData } = _this,
        start = isRefresh ? getDefaultPaginations().nowPage : nowPage;
      const { success, data: res, msg = '获取数据失败，请稍后再试。' } = yield call(Services.queryVideoList, {
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
