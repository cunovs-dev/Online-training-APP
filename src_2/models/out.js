import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
// import { queryFolder } from 'services/resource';
import { Toast } from 'components';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'out',
  state: {
    bannerDatas: [],
    recommendData: [],
    newCourse: [],
    listData: [],
    infoDatas: [],
    carouseDatas: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/out') {
          dispatch({
            type: 'updateState',
            payload: {
              contents: []
            },
          });
          if (action === 'PUSH') {
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

    },
  },
});
