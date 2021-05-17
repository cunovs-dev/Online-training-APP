import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import FilterModal from 'components/filterModal';
import { List } from 'components';

const Comp = ({ location, dispatch, out }) => {
  const { list } = out;
  return (
    <div >
      <Nav title="省外" dispatch={dispatch} />
      <FilterModal/>
    </div >
  );
};

export default connect(({ loading, out }) => ({
  loading,
  out,
}))(Comp);
