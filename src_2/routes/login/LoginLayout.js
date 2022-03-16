/**
 * @author Lowkey
 * @date 2021/04/25 10:00:13
 * @Description: 登录Layout 登录注册嵌套路由
 */
import React from 'react';
import styles from './index.less';
import bg from 'themes/images/login/loginbg.png';

const PrefixCls = 'login';

class LoginLayout extends React.Component {
  render () {
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{ backgroundImage: `url(${bg})` }}>
        {this.props.children}
      </div>
    );
  }
}
export default LoginLayout
