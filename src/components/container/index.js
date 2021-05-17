import React from 'react';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import styles from './index.less';

const PrefixCls = 'container';

function Container (props) {
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-outer-title`]}>
        <div className={styles.left}>{props.title}</div>
        <span className={styles.right} onClick={props.moreClick}>更多></span>
      </div>
      <div className={styles[`${PrefixCls}-outer-children`]}>{props.children}</div>
    </div>
  );
}

Container.defaultProps = {
  title: '',
  moreClick: null,
};
Container.propTypes = {
  title: PropTypes.string,
};
export default Container;
