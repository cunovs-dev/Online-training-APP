/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2018/10/24
 * @Description: 透明头部，滑动时出现
 */
import React from 'react';
import { Icon } from 'components/index';
import PropTypes from 'prop-types';
import styles from './index.less';
import { getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';

const PrefixCls = 'transparentheader';

class TransparentHeader extends React.Component {
  constructor (props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    isScroll: false,
  };

  componentWillMount () {
    console.log(this._isMounted)
    this._isMounted = true;
    if (this._isMounted) {
      document.body.onscroll = () => {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (sTop > this.props.offset - 45) {
          this.setState({
            isScroll: true,
          });
        } else {
          this.setState({
            isScroll: false,
          });
        }
      };
    }
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

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
                <span onClick={hanleBackClick}><Icon style={{ verticalAlign: 'middle' }} type='left'
                                                     color='#000' /></span>
                <span className={styles[`${PrefixCls}-outer-backBtn-title`]}>
                {this.props.name}
              </span>
              </div>
              <div className={styles[`${PrefixCls}-outer-rightBtn`]}>

              </div>
            </div>
            :
            <div className={styles[`${PrefixCls}-transparentouter`]}
                 style={{ background: `transparent` }}>
              <div className={styles[`${PrefixCls}-transparentouter-backBtn`]} onClick={hanleBackClick}>
                <Icon style={{ verticalAlign: 'middle' }} type='left' color='#fff' />
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
