/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:28
 * @LastEditTime: 2021-12-08 17:20:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\consumption\index.js
 */
import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon } from 'components';
import ListView from 'components/listview';
import NoContent from 'components/nocontent';
import { consumptionRow } from 'components/row';
import { routerRedux } from 'dva/router';
import bg from '../../themes/images/others/mineBg.png';
import styles from './index.less';

const PrefixCls = 'consumption';
const Consumption = ({ dispatch, location, consumption, loading }) => {
  const { query: { name } } = location,
    { listData, hasMore, scrollerTop } = consumption,
    num = listData.length > 0 ? listData[0].latestIntegral : 0,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          callback,
        },
      });
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top,
          },
        });
      }
    };
  const getContents = (lists) => (
    <ListView
      layoutHeader={''}
      dataSource={lists}
      layoutRow={(rowData, sectionID, rowID) => {
        return consumptionRow(rowData, sectionID, rowID, null, dispatch);
      }}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      hasMore={hasMore}
      onScrollerTop={onScrollerTop.bind(null)}
      useBodyScroll={false}
      scrollerTop={scrollerTop}
    />
  );

  return (
    <div>
      <div className={styles.container} style={{ backgroundImage: `url(${bg})` }}>
        <div className={styles.top}>
          <div className={styles.back} onClick={() => dispatch(routerRedux.goBack())}>
            <Icon type="left" size="lg" />
            {name}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>剩余积分</div>
          <div className={styles.integral}>{num}</div>
        </div>
      </div>
      <WhiteSpace />
      {listData.length > 0 ? getContents(listData) : <NoContent isLoading={loading} />}
    </div>
  );
};
export default connect(({ loading, consumption }) => ({
  loading: loading.effects['consumption/query'],
  consumption,
}))(Consumption);
