import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { config, cookie } from 'utils';
import { Toast } from 'antd-mobile';

const MD5 = require('md5'),
  encrypt = (word) => {
    return MD5(word, 'hex');
  },
  { _cs } = cookie,
  { userTag: { username } } = config;

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
