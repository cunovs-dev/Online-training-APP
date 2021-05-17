import { parse } from 'qs';
import { model } from 'models/common';
import { Toast } from 'components';
import modelExtend from 'dva-model-extend';
import { getAttendance } from '../services/app';

const defaultListData = [
  {
    image: require('../themes/images/list/01.jpg'),
    title: 'Web前端开发之JavaScript精英课堂【渡一教育】',
    price: '240',
    people: '2480',
  },
  {
    image: require('../themes/images/list/02.jpg'),
    title: '淘宝运营 引爆店铺免费流量 搜索排名 直通车新玩法【思睿电商】',
    price: '140',
    people: '5125',
  },
  {
    image: require('../themes/images/list/03.jpg'),
    title: 'Sai商业插画班、萌系漫画、Q版设计三位老师传授二次元绘画秘籍',
    price: '20',
    people: '1230',
  },
  {
    image: require('../themes/images/list/04.jpg'),
    title: '摄影拍摄/摄影后期修图/人像后期/影楼后期/PS商业修图/风光调色',
    price: '99',
    people: '254',
  },
  {
    image: require('../themes/images/list/05.png'),
    title: '（今晚直播）3DMAX建模效果图 CAD VRAY PS 室内设计 家装工装',
    price: '34',
    people: '23',
  },

];

export default modelExtend(model, {
  namespace: 'videoList',
  state: {
    listData: [],
    refreshing: false,
    scrollTop: 0,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { courseid = '' } = query;
        if (pathname === '/videoList') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                data: {},
              },
            });
            dispatch({
              type: 'fetch',
              payload: {
                courseid,
              },
            });
          }
        }
      });
    },
  },

  effects: {
    * fetch ({ payload }, { call, put, select }) {
      // const { users: { userid } } = yield select(_ => _.app),
      //   data = yield call(getAttendance, { ...payload, userid });
      // if (data.success) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       data: data || {}
      //     }
      //   });
      // } else {
      //   Toast.fail(data.message || '获取失败');
      // }
      yield put({
        type: 'updateState',
        payload: {
          listData: defaultListData,
        },
      });
    },
  },
});
