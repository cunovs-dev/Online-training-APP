/*
 * @Author: your name
 * @Date: 2021-12-08 17:57:33
 * @LastEditTime: 2021-12-16 09:40:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\models\reply.js
 */

import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { reply } from 'services/api.js';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'reply',
  effects: {
    * reply ({ payload, callback }, { call, put }) {
      const { success } = yield call(reply, payload);
      if (success) {
        Toast.success('评论成功');
        yield put(routerRedux.goBack());
        if (callback) callback();
      }
    },
  }
});
