/**
 * @author Lowkey
 * @date 2021/04/25 12:27:41
 * @Description: 首页纯UI展示 不考虑场景需求
 */

import React from 'react';
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

const Dashboard = ({ dashboard, app, loadList, dispatch }) => {
  const { BaseLine } = Layout,
    { posterData, listData, hasMore, scrollTop, selectKey, recommendData, requiredData } = dashboard,
    { sceneList, vocationalList } = app,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          isRefresh: true,
          id: selectKey,
        },
        callback,
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          id: selectKey,
        },
        callback,
      });
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollTop: top,
          },
        });
      }
    };
  const onSort = (sort) => {
    dispatch({
      type: 'dashboard/updateState',
      payload: {
        listData: [],
      },
    });
    dispatch({
      type: 'dashboard/queryList',
      payload: {
        id: selectKey,
        type: 'yw',
        sort,
        isRefresh: true,
      },
    });
  };
  const listProps = {
    onRefresh,
    onScrollerTop,
    onEndReached,
    listData,
    hasMore,
    scrollTop,
    loading: loadList,
    dispatch,
    onSort,

  };
  const getChildren = (arr) => (
    arr && arr.map((data, i) =>
      <InfoBox
        key={i}
        {...data}
        handleClick={() => handleGoto(dispatch, 'lessondetails', { id: data.videoId })}
      />)
  );
  const onChange = (tab, key) => {
    const { id } = tab;
    dispatch({
      type: 'dashboard/updateState',
      payload: {
        selectKey: key,
        listData: [],
      },
    });
    dispatch({
      type: 'dashboard/queryList',
      payload: {
        id,
        type: 'yw',
        isRefresh: true,
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
              <Banner hasTitle bannerDatas={posterData} dispatch={dispatch} handleClick={handleGoto} />}
            </div>
            <WhiteSpace size="md" />
            <CarouselGrid data={sceneList} dispatch={dispatch} handlerClick={handleGridClick} />
            <WhiteSpace size="md" />
            <HotCourse
              bannerDatas={recommendData}
              handleClick={handleGoto}
              dispatch={dispatch}
              moreClick={() => handleGoto(dispatch, 'videoList', { name: '猜你喜欢', fetchType: 'recommend' })}
            />
            <WhiteSpace size="md"
            />
            <Container
              title="必修课程"
              children={getChildren(requiredData)}
              moreClick={() => handleGoto(dispatch, 'videoList', { name: '必修课程', fetchType: 'required' })}
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
        tabs={[{ title: '首页', id: 0 }, ...vocationalList]}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor="#02b7ee"
        page={selectKey}
        tabBarTextStyle={{ color: '#8a8b8e' }}
        swipeable={false}
        onChange={onChange}
      >
        {getContent(selectKey)}
      </Tabs>
    </div>
  );
};


export default connect(({ dashboard, app, loading }) => ({
  dashboard,
  app,
  loadList: loading.effects['dashboard/queryList'],
}))(Dashboard);
