import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import dashboard from './dashboard';

const getViewIamges = (text) => {
    const result = [];
    if (text) {
      const imgReg = /<img.*?(?:>|\/>)/gi,
        srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
        images = text.match(imgReg);
      images && images.map(image => {
        let imageSrc = image.match(srcReg);
        if (imageSrc && imageSrc[1]) {
          result.push(imageSrc[1].replace(':80/', '/'));
        }
      });
    }
    return result;
  },

  getCurrentData = (arr) => {

  };

export default modelExtend(model, {
  namespace: 'details',
  state: {
    currentData: {},
    isOpen: false,
    viewImages: [],
    viewImageIndex: -1,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/details')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                isOpen: false,
                viewImages: [],
                viewImageIndex: -1,
                currentData: {},
                isPraise: false,
              },
            });
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { newData } = yield select((_ => _.dashboard));
      const viewImages = getViewIamges(newData.content);
      yield put({
        type: 'updateState',
        payload: {
          currentData: newData.content,
          viewImages,
        },
      });
    },

  },
});
