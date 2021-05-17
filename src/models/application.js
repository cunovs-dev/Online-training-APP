import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'application',
  state: {
    content: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/application')) {
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

    },
  }

});
