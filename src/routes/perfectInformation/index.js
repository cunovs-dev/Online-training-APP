import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { defaultBusiness } from 'utils/defaults';

import FilterForm from 'components/filterForm';
import { List } from 'components';
import styles from './index.less';


const Comp = ({ location, app, dispatch, perfectInformation }) => {
  const { vocationalList, sceneList } = app;
  const submit = (data) => {
    dispatch({
      type: 'perfectInformation/setInformationApi',
      payload: data,
    });
  };
  return (
    <div>
      <Nav title="完善个人信息" dispatch={dispatch} />
      <div className={styles.content}>
        <FilterForm perfect vocationalList={vocationalList} sceneList={sceneList} onOk={submit} />
      </div>
    </div>
  );
};

export default connect(({ loading, app, perfectInformation }) => ({
  loading,
  app,
  perfectInformation,
}))(Comp);
