import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const defaultData = [
  {
    icon: require('../themes/images/others/history.png'),
    text: '个人信息',
  },
  {
    icon: require('../themes/images/others/course.png'),
    text: '我的收藏',
  },
  {
    icon: require('../themes/images/others/note.png'),
    text: '能力测试',
  }, {
    icon: require('../themes/images/others/credit.png'),
    text: '消费记录',
  }
];
export default modelExtend(model, {
  namespace: 'mine',
  state: {

  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/mine') {
          dispatch({
            type: 'queryMessage',
          });
        }
      });
    }
    ,
  },
  effects: {
    * queryMessage ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          gridData: defaultData,
        },
      });
    },
  },

});
