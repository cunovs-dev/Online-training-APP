/**
 * @author Lowkey
 * @date 2021/05/06 17:38:19
 * @Description: 通用视频列表
 */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import VideoListView from 'components/videoListView';
import { handleGoto } from 'utils/commonevents';


const PrefixCls = 'videoList';

function VideoList ({ location, dispatch, videoList, loading }) {
  const { name = '', fetchType, id } = location.query,
    { listData, hasMore, scrollerTop } = videoList,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/fetch`,
        payload: {
          isRefresh: true,
          fetchType,
          id,
        },
        callback,
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/fetch`,
        payload: {
          fetchType,
          id,
        },
        callback,
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
    },
    onSort = (sort) => {
      dispatch({
        type: `${PrefixCls}/fetch`,
        payload: {
          id,
          fetchType,
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
    scrollerTop,
    loading,
    dispatch,
    onSort,
  };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <VideoListView {...listProps} />
    </div>
  );
}

export default connect(({ loading, videoList }) => ({
  loading: loading.effects['videoList/fetch'],
  videoList,
}))(VideoList);
