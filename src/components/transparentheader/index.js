/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:28
 * @LastEditTime: 2021-12-16 11:04:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\components\transparentheader\index.js
 */
/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2018/10/24
 * @Description: 透明头部，滑动时出现
 */
import React from 'react';
import { Icon } from 'components/index';
import PropTypes from 'prop-types';
import { getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'transparentheader';

class TransparentHeader extends React.Component {
  constructor (props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    isScroll: false,
  };

  // componentWillMount () {
  //   this._isMounted = true;
  //   if (this._isMounted) {
  //     document.body.onscroll = () => {
  //       let sTop = document.documentElement.scrollTop || document.body.scrollTop;
  //       if (sTop > this.props.offset - 45) {
  //         this.setState({
  //           isScroll: true,
  //         });
  //       } else {
  //         this.setState({
  //           isScroll: false,
  //         });
  //       }
  //     };
  //   }
  // }

  // componentWillUnmount () {
  //   this._isMounted = false;
  // }

  render () {
    const hanleBackClick = () => {
      this.props.dispatch(routerRedux.goBack());
    };

    return (
      <div>
        {
          this.state.isScroll
            ?
            <div className={styles[`${PrefixCls}-outer`]}>
                <div className={styles[`${PrefixCls}-outer-backBtn`]}>
                <span onClick={hanleBackClick}><Icon style={{ verticalAlign: 'middle' }}
                    type="left"
                    color="#000"
                  /></span>
                <span className={styles[`${PrefixCls}-outer-backBtn-title`]}>
                    {this.props.name}
                  </span>
              </div>
                <div className={styles[`${PrefixCls}-outer-rightBtn`]} />
              </div>
            :
              <div className={styles[`${PrefixCls}-transparentouter`]}
              style={{ background: 'transparent', position: 'fixed' }}
            >
              <div className={styles[`${PrefixCls}-transparentouter-backBtn`]} onClick={hanleBackClick}>
                  <Icon style={{ verticalAlign: 'middle' }} type="left" color="#fff" />
                </div>
              <div className={styles[`${PrefixCls}-transparentouter-rightBtn`]}>
                  {this.props.children}
                </div>
            </div>
        }
      </div>
    );
  }
}

TransparentHeader.defaultProps = {
  name: '',
};
TransparentHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element,
};
export default TransparentHeader;
