import React from 'react';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';

const Collection = (props) => {
  const { isCollect,handlerClick } = props;
  return (
    <div style={{ marginLeft: 20 }} onClick={handlerClick}>
      {
        isCollect ?
          <Icon type={getLocalIcon('/components/collected.svg')} color="#f97a20" />
          :
          <Icon type={getLocalIcon('/components/collect.svg')} color="#f97a20" />
      }
    </div>
  );
};
Collection.defaultProps = {
  isCollect: false,
  handlerClick:null
};
export default Collection;
