import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const namespace = 'classify';
const defaultItems = [
    '职业资格', '外语考试', '教师资格', '公务员', 'IT', '银行', '考研', '计算机教育', '测试', '平面设计'
  ],
  defaultListData = [
    { image: require('../themes/images/list/01.jpg'),
      title: 'Web前端开发之JavaScript精英课堂【渡一教育】',
      price: '240',
      people: '2490',
    },
    { image: require('../themes/images/list/02.jpg'),
      title: '淘宝运营 引爆店铺免费流量 搜索排名 直通车新玩法【思睿电商】',
      price: '140',
      people: '5125',
    },
    { image: require('../themes/images/list/03.jpg'),
      title: 'Sai商业插画班、萌系漫画、Q版设计三位老师传授二次元绘画秘籍',
      price: '20',
      people: '1230',
    },
    { image: require('../themes/images/list/04.jpg'),
      title: '摄影拍摄/摄影后期修图/人像后期/影楼后期/PS商业修图/风光调色',
      price: '99',
      people: '254',
    },
    { image: require('../themes/images/list/05.png'),
      title: '（今晚直播）3DMAX建模效果图 CAD VRAY PS 室内设计 家装工装',
      price: '34',
      people: '23',
    },

  ],
  defaultTabs = [
    { title: '公职考试' },
    { title: '法学院' },
    { title: '财会金融' },
    { title: '土木建筑' },
    { title: '中级技术' },
  ];
export default modelExtend(model, {
  namespace,
  state: {
    items: [],
    tabs: [],
    listData: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === `/${namespace}`) {
          if (action === 'PUSH') {
            dispatch({
              type: 'queryListview',
            });
          }
        }
      });
    },
  },
  effects: {
    * queryListview ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          items: defaultItems,
          tabs: defaultTabs,
          listData: defaultListData
        }
      });
    },
  },
});
