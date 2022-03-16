import React from 'react';
import { Tag } from 'components';
import styles from './index.less';

const PrefixCls = 'classifyitem';

const ClassifyItem = (props) => {
  return (
    <div className={styles[`${PrefixCls}-container`]}>
      {props.data.map((data) => {
        return (
          <div key={data.flagId} className={styles[`${PrefixCls}-container-item`]}>
            <Tag selected={props.currentValue === data.flagId} onChange={()=>props.onChange(data)}>{data.flagName}</Tag>
          </div>
        );
      })}
    </div>
  );
};
ClassifyItem.defaultProps = {
  data: [],
};
ClassifyItem.PropTypes = {};
export default ClassifyItem;
