import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import FilterModal from 'components/filterModal';
import { List } from 'components';

const Comp = ({ location, dispatch, find }) => {
  const { list } = find;
  return (
    <div>
      <Nav title="发现" dispatch={dispatch} />
      <FilterModal />
    </div>
  );
};

export default connect(({ loading, find }) => ({
  loading,
  find,
}))(Comp);
