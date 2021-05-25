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


const PrefixCls = 'collection';

function Collection ({ location, dispatch, collection, loading }) {
  const { name = '' } = location.query,
    { listData, hasMore, scrollerTop } = collection,
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
    selectable: false,
  };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <VideoListView {...listProps} />
    </div>
  );
}

export default connect(({ loading, collection }) => ({
  loading: loading.effects['collection/fetch'],
  collection,
}))(Collection);
