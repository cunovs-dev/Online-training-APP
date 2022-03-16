/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-23 17:10:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\perfectInformation\index.js
 */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { questionnairePath } from 'utils/defaults';
import { routerRedux } from 'dva/router';
import FilterForm from 'components/filterForm';
import { List } from 'components';
import styles from './index.less';

const Comp = ({ location, app, dispatch }) => {
  const { title = '完善个人信息' } = location.query;
  const { vocationalList, sceneList, weaknessList, selfChoice = {} } = app;
   
  const goBack = () => {
    dispatch(routerRedux.goBack());
  };

  const submit = (data, type) => {
    dispatch({
      type: 'perfectInformation/setInformationApi',
      payload: data,
      callback: type === 'edit' ? goBack : () => cnOpen(questionnairePath),
    });
  };
  
  const props = {
    selfChoice,
    vocationalList,
    sceneList,
    weaknessList,
    onOk: submit,
  };

  return (
    <div>
      <Nav title={title} dispatch={dispatch} />
      <div className={styles.content}>
        <FilterForm perfect {...props} />
      </div>
    </div>
  );
};

export default connect(({ loading, app, perfectInformation }) => ({
  adding: loading.effects['perfectInformation/setInformationApi'],
  app,
  perfectInformation,
}))(Comp);
