/* eslint-disable no-undef */
import React from 'react';
import { SearchBar } from 'antd-mobile';
import { Icon } from 'components/index';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import defaultUserIcon from '../../themes/images/default/userIcon.jpg';
import PropTypes from 'prop-types';
import styles from './index.less';


const PrefixCls = 'userinfo';
class UserInfo extends React.Component {
  state = {

  }

  componentWillMount () {

  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-imgbox`]} >
          <img src={defaultUserIcon} alt="" />
          <div>
            <span>张三</span>
            <span>积分: 10</span>
          </div>
        </div>
      </div>
    );
  }
}

UserInfo.defaultProps = {

};
UserInfo.propTypes = {

};
export default UserInfo;
