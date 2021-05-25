import React from 'react';
import { connect } from 'dva';
import { defaultBusiness } from 'utils/defaults';
import FilterModal from 'components/filterModal';
import FilterForm from 'components/filterForm';
import { List, SearchBar } from 'components';


const Comp = ({ location, dispatch, find }) => {
  const { list } = find;
  return (
    <div>
      <SearchBar style={{backgroundColor:'#02b7ee'}} placeholder="搜索" maxLength={8} />
      <FilterModal form={<FilterForm />} />

    </div>
  );
};

export default connect(({ loading, find }) => ({
  loading,
  find,
}))(Comp);
