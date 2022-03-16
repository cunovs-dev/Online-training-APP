/**
 * @author Lowkey
 * @date 2021/04/25 12:29:29
 * @Description:
 */
import React from 'react';
import { Icon } from 'components/index';
import styles from './index.less';
import logo from '../../../assets/logo.png';
import { getLocalIcon } from 'utils';

const PrefixCls = 'searchheader';

const SearchHeader = (props) => {

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <img className={styles.logo} src={logo} alt="" />
      <div className={styles[`${PrefixCls}-outer-search`]} onClick={props.handlerClick}>
        <Icon type="search" />
        <span style={{ marginLeft: 10 }}>搜索</span>
      </div>
      <div className={styles[`${PrefixCls}-outer-text`]}>
        {props.children}
      </div>
    </div>
  );
};

export default SearchHeader;
