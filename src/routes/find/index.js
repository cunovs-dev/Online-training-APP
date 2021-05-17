import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { defaultBusiness } from 'utils/defaults';
import FilterModal from 'components/filterModal';
import FilterForm from 'components/filterForm';
import { List } from 'components';


const Comp = ({ location, dispatch, find }) => {
  const { list } = find;
  return (
    <div>
      <Nav title="发现" dispatch={dispatch} />
      <FilterModal form={<FilterForm />} />
    </div>
  );
};

export default connect(({ loading, find }) => ({
  loading,
  find,
}))(Comp);
