/**
 * @author Lowkey
 * @date 2021/05/27 13:27:47
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import VideoListView from 'components/videoListView';
import { handleGoto } from 'utils/commonevents';


const PrefixCls = 'collection';

function Collection ({ location, dispatch, collection, loading }) {
  const { name = '' } = location.query,
    { listData, hasMore, scrollTop } = collection,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          isRefresh: true,
        },
        callback,
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
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
  const listProps = {
    onRefresh,
    onScrollerTop,
    onEndReached,
    listData,
    hasMore,
    scrollTop,
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
  loading: loading.effects['collection/queryList'],
  collection,
}))(Collection);
