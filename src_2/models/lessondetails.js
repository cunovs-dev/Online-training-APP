import modelExtend from 'dva-model-extend';
import { queryCourse, collect, praise, payCourse } from 'services/api';
import * as Services from 'services/querylist';
import { model } from 'models/common';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'lessondetails',
  state: {
    infoData: {},
    recommendData: [],
    selectKey: 0,
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        const { id } = query;
        if (pathname === '/lessondetails') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                infoData: {},
                recommendData: [],
                selectKey: 0,
              },
            });
            dispatch({
              type: 'query',
              payload: {
                videoId: id,
              },
            });
            dispatch({
              type: 'queryRecommend',
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { data, success, msg } = yield call(queryCourse, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            infoData: data,
          },
        });
      } else {
        Toast.fail(msg);
      }
    },
    * queryRecommend ({ payload }, { put, call }) {
      const { data: list, success, msg } = yield call(Services.queryRecommend);
      if (success) {
        const { data } = list;
        yield put({
          type: 'updateState',
          payload: {
            recommendData: data,
          },
        });
      } else {
        Toast.fail(msg);
      }
    },
    * collect ({ payload }, { call, put }) {
      const { data, success, msg } = yield call(collect, payload);
      if (success) {
        yield put({
          type: 'updateStatus',
          payload: {
            isCollect: data.isCollect ? '1' : '0',
          },
        });
        Toast.success(data.isCollect ? '已收藏' : '已取消');
      } else {
        Toast.fail(msg);
      }
    },
    * praise ({ payload }, { call, put }) {
      const { data, success, msg } = yield call(praise, payload);
      if (success) {
        yield put({
          type: 'updateStatus',
          payload: {
            isPraise: data.isPraise ? '1' : '0',
          },
        });
        yield put({
          type: 'updatePraise',
          payload: {
            isPraise: data.isPraise ? 1 : -1,
          },
        });
        Toast.success(data.isPraise ? '已赞' : '已取消');
      } else {
        Toast.fail(msg);
      }
    },
    * payCourse ({ payload }, { call, put }) {
      const { success, msg } = yield call(payCourse, payload);
      if (success) {
        yield put({
          type: 'updateStatus',
          payload: {
            hasAuth: '1',
          },
        });
      } else {
        Toast.fail(msg);
      }
    },
  },
  reducers: {
    updateStatus (state, { payload }) {
      const { infoData } = state;
      return {
        ...state,
        infoData: {
          ...infoData,
          ...payload,
        },
      };
    },
    updatePraise (state, { payload }) {
      const { infoData } = state;
      const { praise } = infoData;
      const { isPraise } = payload;
      return {
        ...state,
        infoData: {
          ...infoData,
          praise: praise + isPraise,
        },
      };
    },
  },
});
