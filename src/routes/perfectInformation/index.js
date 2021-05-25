import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { defaultBusiness } from 'utils/defaults';

import FilterForm from 'components/filterForm';
import { List } from 'components';
import styles from './index.less'


const Comp = ({ location, dispatch, perfectInformation }) => {
  const { list } = perfectInformation;
  return (
    <div>
      <Nav title="完善个人信息" dispatch={dispatch} />
      <div className={styles.content}>
        <FilterForm perfect />
      </div>
    </div>
  );
};

export default connect(({ loading, perfectInformation }) => ({
  loading,
  perfectInformation,
}))(Comp);
