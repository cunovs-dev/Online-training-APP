/*
 * @Author: your name
 * @Date: 2021-12-15 15:27:12
 * @LastEditTime: 2021-12-16 14:16:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\praise\index.js
 */
/**
 * @author Lowkey
 * @date 2021/05/27 13:27:47
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import VideoListView from 'components/videoListView';


const PrefixCls = 'praise';

function Praise ({ location, dispatch, praise, loading }) {
  const { name = '' } = location.query,
    { listData, hasMore, scrollTop } = praise,
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

export default connect(({ loading, praise }) => ({
  loading: loading.effects['praise/queryList'],
  praise,
}))(Praise);
