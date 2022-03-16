import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import styles from './index.less';

const PrefixCls = 'nav';

function Nav (props) {
  const goBack = () => {
    props.dispatch(routerRedux.goBack());
    if (typeof props.navEvent === 'function') {
      props.navEvent();
    }
  };
  return (
    <div>
      <div className={styles[`${PrefixCls}-header-box`]}>
        <div className={styles[`${PrefixCls}-header`]}>
          <NavBar
            leftContent=""
            onLeftClick={props.isGoBack ? () => goBack() : null}
            mode="dark"
            icon={props.isGoBack ? <Icon type="left" color="#fff" /> : props.icon}
            rightContent={props.renderNavRight}
          >{props.title}</NavBar>
        </div>
      </div>
    </div>
  );
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
Nav.defaultProps = {
  renderNavRight: null,
  title: '',
  navEvent: null,
  isGoBack: true,
  icon: null,
};
export default Nav;
