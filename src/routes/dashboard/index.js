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
import { handleGoto, handleBuildingClick, handleGridClick } from 'utils/commonevents';
import { defaultBusiness } from 'utils/defaults';
import Banner from 'components/banner/index';
import HotCourse from 'components/hotCourse/index';
import CarouselGrid from 'components/carouselgrid';
import Container from 'components/container/index';
import Refresh from 'components/pulltorefresh';
import InfoBox from 'components/infobox/index';
import VideoListView from 'components/videoListView';
import SearchHeader from 'components/searchheader';

const PrefixCls = 'dashboard';

const Dashboard = ({ dashboard, app, loading, dispatch }) => {
  const { BaseLine } = Layout,
    { posterData, listData, hasMore, scrollerTop, selectKey, recommendData, requiredData } = dashboard,
    { sceneList, vocationalList } = app,
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
    dispatch({
      type: 'dashboard/queryList',
      payload: {
        id: key,
        type: 'yw',
      },
    });
    dispatch({
      type: 'dashboard/updateState',
      payload: {
        selectKey: key,
      },
    });
  };
  const getContent = (selectKey) => {
    if (selectKey === 0) {
      return (
        <Refresh>
          <div className={styles.children}>
            <div>
              {posterData.length > 0 &&
              <Banner hasTitle bannerDatas={posterData} />}
            </div>
            <WhiteSpace size="md" />
            <CarouselGrid data={sceneList} dispatch={dispatch} handlerClick={handleGridClick} />
            <WhiteSpace size="md" />
            <HotCourse
              bannerDatas={recommendData}
              handleClick={handleBuildingClick.bind(null, dispatch)}
              moreClick={() => handleGoto(dispatch, 'videoList', { name: '猜你喜欢' })}
            />
            <WhiteSpace size="md"
            />
            <Container
              title="必修课程"
              children={getChildren(requiredData)}
              moreClick={() => handleGoto(dispatch, 'videoList', { name: '必修课程' })}
            />
            <WhiteSpace size="md" />
            <BaseLine />
          </div>
        </Refresh>
      );
    }
    return <VideoListView {...listProps} />;
  };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <SearchHeader
        dispatch={dispatch}
        placeholder="搜索"
        children={null}
        handlerClick={() => handleGoto(dispatch, 'find')}
      />
      <Tabs
        tabs={vocationalList}
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

export default connect(({ dashboard, app, loading }) => ({ dashboard, app, loading }))(Dashboard);
