/**
 * @author Lowkey
 * @date 2021/04/25 12:27:41
 * @Description: 首页纯UI展示 不考虑场景需求
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, WhiteSpace, Icon, Tabs, List } from 'components';
import styles from './index.less';
import { getLocalIcon } from 'utils';
import { handleGoto, handleBuildingClick } from 'utils/commonevents';
import Banner from 'components/banner/index';
import HotCourse from 'components/hotCourse/index';
import CarouselGrid from 'components/carouselgrid';
import Container from 'components/container/index';
import Refresh from 'components/pulltorefresh';
import InfoBox from 'components/infobox/index';
import VideoListView from 'components/videoListView';
import SearchHeader from 'components/searchheader';

const PrefixCls = 'dashboard';
const tabs = [
  { title: '首页' },
  { title: '移动' },
  { title: '家庭' },
  { title: '新兴' },
  { title: '政企' },
  { title: '团队管理' },
  { title: '客情维系' },
];
const Dashboard = ({ dashboard, loading, dispatch }) => {
  const { BaseLine } = Layout,
    { bannerDatas, listData, hasMore, scrollerTop, selectKey, hotBannerDatas, infoDatas, carouseDatas } = dashboard,
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
  const listProps = {
    onRefresh,
    onScrollerTop,
    onEndReached,
    listData,
    hasMore,
    scrollerTop,
    loading,
    dispatch,
  };
  const getChildren = (arr) => (
    arr && arr.map((data, i) => <InfoBox key={i} {...data} handleClick={handleBuildingClick.bind(null, dispatch)} />)
  );
  const onChange = (tab, key) => {
    console.log(key)
    dispatch({
      type: 'dashboard/updateState',
      payload: {
        selectKey: key,
      },
    });

  };
  const getContent = (selectKey) => {
    if (selectKey===0) {
      return (
        <Refresh>
          <div className={styles.children} >
            <div>
              {bannerDatas.length > 0 &&
              <Banner bannerDatas={bannerDatas} handleClick={() => handleGoto(dispatch, 'lessondetails')} />}
            </div>
            <WhiteSpace size="md" />
            <CarouselGrid datas={carouseDatas} />
            <WhiteSpace size="md" />
            <HotCourse bannerDatas={hotBannerDatas} handleClick={handleBuildingClick.bind(null, dispatch)}
                       moreClick={() => handleGoto(dispatch, 'videoList', { name: '猜你喜欢' })} />
            <WhiteSpace size="md" />
            <Container
              title="必修课程"
              children={getChildren(infoDatas)}
              moreClick={() => handleGoto(dispatch, 'videoList', { name: '必修课程' })}
            />
            <WhiteSpace size="md" />
            <BaseLine />
          </div>;
        </Refresh>
      )
    }
    return <VideoListView {...listProps} />;
  };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <SearchHeader
        dispatch={dispatch}
        placeholder="搜索"
        children={null}
      />
      <Tabs
        tabs={tabs}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor="#02b7ee"
        tabBarTextStyle={{ color: '#8a8b8e' }}
        swipeable={false}
        onChange={onChange}
      >
        {getContent(selectKey)}
      </Tabs>
    </div>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard);
