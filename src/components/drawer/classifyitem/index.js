import React from 'react';
import { Tag } from 'components';
import styles from './index.less';

const PrefixCls = 'classifyitem';

const ClassifyItem = (props) => {
  return (
    <div className={styles[`${PrefixCls}-container`]}>
      {props.data.map((data, i) => {
        return (
          <div key={i} className={styles[`${PrefixCls}-container-item`]}>
            <Tag selected={props.currentValue === data.value} onChange={()=>props.onChange(data)}>{data.label}</Tag>
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
