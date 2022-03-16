import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { config, cookie } from 'utils';

export default modelExtend(model, {
  namespace: 'setup',
  state: {
    animating: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query } = location;
        if (pathname.startsWith('/setup')) {

        }
      });
    },
  },
  effects: {


  },


});
