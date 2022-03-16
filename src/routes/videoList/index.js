/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-23 15:40:35
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\videoList\index.js
 */
/**
 * @author Lowkey
 * @date 2021/05/06 17:38:19
 * @Description: 通用视频列表
 */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import VideoListView from 'components/videoListView';


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
    fetchType,
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
