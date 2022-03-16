/*
 * @Author: your name
 * @Date: 2021-12-09 11:04:59
 * @LastEditTime: 2021-12-16 13:33:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\models\rank.js
 */
import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { queryLntegralList, queryRank } from 'services/querylist';


export default modelExtend(model, {
  namespace: 'rank',
  state: {
    rankList: [],
    myRank: {}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query } = location;
        if (pathname.startsWith('/rank')) {
          dispatch({
            type: 'updateState',
            payload: {
              currentData: {},
            },
          });
          dispatch({
            type: 'queryRank',
         
          });
          dispatch({
            type: 'queryMine',

          });
        }
      });
    },
  },
  effects: {
    * queryRank ({ payload }, { call, put }) {
      const { data, success } = yield call(queryLntegralList, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            rankList: data.data
          }
        });
      }
    },
    * queryMine ({ payload }, { call, put }) {
      const { data, success } = yield call(queryRank, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            myRank: data
          }
        });
      }
    },
  },
});
