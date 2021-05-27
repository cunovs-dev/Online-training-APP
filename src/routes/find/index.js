import React from 'react';
import { connect } from 'dva';
import { defaultBusiness } from 'utils/defaults';
import FilterModal from 'components/filterModal';
import FilterForm from 'components/filterForm';
import VideoListView from 'components/videoListView';
import { List, SearchBar } from 'components';

let child,
  PrefixCls = 'find';
const Comp = ({ location, dispatch, find, loadingList, app }) => {
  const { vocationalList, sceneList, weaknessList } = app,
    { listData, hasMore, scrollerTop } = find;
  const submit = (data) => {
    dispatch({
      type: 'find/search',
      payload: data,
      callback: child.handlerCancelClick,
    });
  };
  const search = (txt) => {
    dispatch({
      type: 'find/search',
      payload: {
        txt,
        isRefresh: true,
      },
    });
  };
  const props = {
    vocationalList,
    sceneList,
    weaknessList,
    onOk: submit,
    onCancel: () => child.handlerCancelClick(),
  };

  const onRef = (ref) => {
    child = ref;
  };

  const onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
        payload: {
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
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
    loadingList,
    dispatch,
    selectable: false,
  };

  return (
    <div>
      <SearchBar style={{ backgroundColor: '#02b7ee' }} onSubmit={search} placeholder="搜索" maxLength={8} />
      <FilterModal onRef={onRef} form={<FilterForm  {...props} hasFooter />} hasFooter={false} />
      <VideoListView  {...listProps} />
    </div>
  );
};

export default connect(({ loading, find, app }) => ({
  loadingList: loading.effects['find/search'],
  find,
  app,
}))(Comp);
