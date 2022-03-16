import modelExtend from 'dva-model-extend';
import { queryCourse, collect, praise, payCourse, queryTest, sendTest, setTime } from 'services/api';
import * as Services from 'services/querylist';
import { model } from 'models/common';
import { Toast } from 'components';

const namespace = 'lessondetails';
const getDefaultPaginations = () => ({
  nowPage: 1,
  pageSize: 10,
});
export default modelExtend(model, {
  namespace,
  state: {
    infoData: {},
    recommendData: [],
    selectKey: 0,
    refreshing: false,
    scrollTop: 0,
    paginations: getDefaultPaginations(),
    hasMore: true,
    replyList: [],
    resultId: '',
    testData: {}
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        const { id } = query;
        if (pathname === '/lessondetails') {
          if (action === 'PUSH') {
            dispatch({
              type: 'reset',
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
    * fetchReply ({ payload, callback }, { call, put, select }) {
      const { isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, pageSize }, replyList } = _this,
        start = isRefresh ? getDefaultPaginations().nowPage : nowPage;
      const { data = [], success, msg } = yield call(Services.queryReplyList, { ...payload, nowPage: start, pageSize });
      if (success) {
        let newLists = [];
        newLists = start === getDefaultPaginations().nowPage ? data : [...replyList, ...data];
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
              replyList: newLists,
            },
          });
        }
        if (callback) callback();
      } else {
        Toast.fail(msg || '获取失败');
      }
    },
    * setTime ({ payload }, { call, put }) {
      const { data, success, msg } = yield call(setTime, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            resultId: data.resultId
          }
        });
      } else {
        Toast.fail(msg);
      }
    },
    * getTest ({ payload }, { call, put, select }) {
      const { testData } = yield select(_ => _.lessondetails);
      const { data = {}, success, msg } = yield call(queryTest, payload);
      if (success && data.issueId) {
        const newData = Object.assign(testData, { [data.issueId]: data.txt });
        yield put({
          type: 'updateState',
          payload: {
            testData: newData
          }
        });
      } else {
        // Toast.fail(msg);
      }
    },
    * sendTest ({ payload }, { call, put, select }) {
      const { testData } = yield select(_ => _.lessondetails);
      const { data, success, msg } = yield call(sendTest, payload);
      if (success) {
        const newData = Object.assign(testData, { [data.issueId]: data.txt });
        yield put({
          type: 'updateState',
          payload: {
            testData: newData
          }
        });
        Toast.success('提交成功');
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
    reset (state) {
      return {
        ...state,
        testData: {},
        infoData: {},
        recommendData: [],
        selectKey: 0,
        refreshing: false,
        scrollTop: 0,
        paginations: getDefaultPaginations(),
        hasMore: true,
        replyList: [],
        resultId: ''
      };
    }
  },
});
