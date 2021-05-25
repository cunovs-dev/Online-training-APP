import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const defaultData = [
  {
    title: '如何促进消费？',
    integral: 10,
    date: new Date().getTime(),
  },
  {
    title: '如何促进消费？',
    integral: 10,
    date: new Date().getTime(),
  },
];

export default modelExtend(model, {
  namespace: 'consumption',
  state: {
    listData: [],
    refreshing: false,
    scrollTop: 0,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/consumption')) {
          if (action == 'PUSH') {
            dispatch({
              type: 'query',
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          listData: defaultData,
        },
      });
    },
  },

});
