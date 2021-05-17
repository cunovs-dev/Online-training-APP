import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const defaultInfoDatas = [
  { text: '[艾德]营养师考试通关课程', image: require('../themes/images/newcourse/c01.jpg') },
  { text: '执业兽医资格考试真题解析班', image: require('../themes/images/newcourse/c02.jpg') },
  { text: '设计软件基础班PS/Ai/C4D', image: require('../themes/images/newcourse/c03.jpg') },
  { text: 'Photoshop后期从初级到高级（精修、调色、合成）大师班', image: require('../themes/images/newcourse/c04.jpg') },
];
export default modelExtend(model, {
  namespace: 'lessondetails',
  state: {
    isPraise: false,
    isCollect: false,
    infoData: defaultInfoDatas,
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/lessondetails') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {

    },
  },


});
