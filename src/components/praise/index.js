/**
 * @author Lowkey
 * @date 2021/05/10 11:08:07
 * @Description: 点赞组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';


class Praise extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    action: this.props.praiseLoading,
  };

  render () {
    const {num, handlePraiseClick, isPraise } = this.props;
    return (
      <div className={styles.outer} onClick={handlePraiseClick}>
          <span className={classNames(styles.container, { [styles.praise]: isPraise })}>
            {
              isPraise ? `已赞 ${num}` : `点赞 ${num}`
            }
          </span>
        <div className={classNames(styles.animation, { [styles.praiseActive]: isPraise })}>
          <Icon type={getLocalIcon('/components/sign.svg')} />
        </div>
      </div>
    );
  }
}

Praise.propTypes = {
  handlePraiseClick: PropTypes.func.isRequired,
  noPraise: PropTypes.bool,
  num: PropTypes.number,
  isPraise: PropTypes.bool,
  praiseLoading: PropTypes.bool,
};
Praise.defaultProps = {
  num: 0,
  isPraise: false,
};
export default Praise;
