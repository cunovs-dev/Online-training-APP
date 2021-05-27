/**
 * @author Lowkey
 * @date 2021/04/26 11:55:32
 * @Description:
 */

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, Modal, Grid, Layout } from 'components';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';
import { mineGrid } from 'utils/defaults';
import { _cg } from 'utils/cookie';
import { handleGridClick, handleGoto } from 'utils/commonevents';
import bg from '../../themes/images/others/mineBg.png';
import styles from './index.less';

const PrefixCls = 'mine';

function Mine ({ location, dispatch, mine, app }) {
  const { users: { userName, photoPath } } = app;
  const handleSetupClick = ({ name = '个人设置' }) => {
    dispatch(routerRedux.push({
      pathname: '/setup',
      query: {
        name,
      },
    }));
  };
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.top}>
        <div className={styles.back} onClick={() => dispatch(routerRedux.goBack())}>
          <Icon type="left" size="lg" />会员中心
        </div>
      </div>
      <div className={styles[`${PrefixCls}-infoBox`]}>
        <div className={styles.info}>
          <img src={getImages(photoPath, 'user')} alt="" onError={(el)=>getErrorImg(el,'user')} />
          <div className={styles.right}>
            <div className={styles.name}>
              <span>{userName}</span>
            </div>
            <div className={styles.level}>成长记录</div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.item}>
            <p className={styles.num}>92</p>
            <p className={styles.text}>会员积分</p>
          </div>
          <div className={styles.item}
               onClick={() => handleGoto(dispatch, 'videoList', { name: '已学课程', fetchType: 'history' })}>
            <p className={styles.num}>2</p>
            <p className={styles.text}>已学课程</p>
          </div>
        </div>
      </div>
      <Grid data={mineGrid} hasLine={false} activeStyle={false}
            onClick={(params) => handleGridClick(params, dispatch)} />
      <WhiteSpace size="lg" />
      <div className={styles[`${PrefixCls}-info`]}>
        <List>
          <List.Item
            thumb={<Icon type={getLocalIcon('/mine/aboutus.svg')} />}
            arrow="horizontal"
          >
            关于我们
          </List.Item>
          <List.Item
            thumb={<Icon type={getLocalIcon('/mine/setup.svg')} />}
            arrow="horizontal"
            onClick={handleSetupClick}
          >
            个人设置
          </List.Item>
        </List>
      </div>
      <div>
      </div>
    </div>
  );
}

export default connect(({ loading, mine, app, login }) => ({
  loading,
  mine,
  app,
  login,
}))(Mine);
