/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-16 16:59:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\find\index.js
 */
import React from 'react';
import { connect } from 'dva';
import { defaultBusiness } from 'utils/defaults';
import FilterModal from 'components/filterModal';
import FilterForm from 'components/filterForm';
import VideoListView from 'components/videoListView';
import { List, SearchBar } from 'components';

let child,
  PrefixCls = 'find';
const Comp = ({ dispatch, find, loadingList, app }) => {
  const { vocationalList, sceneList, weaknessList } = app,
    { listData, hasMore, scrollerTop, searchObj, searchTxt } = find;
  const submit = (data) => {
    dispatch({
      type: 'find/search',
      payload: {
        isRefresh: true,
        ...data
      },
      callback: child.handlerCancelClick,
    });
    dispatch({
      type: 'find/updateState',
      payload: {
        searchObj: data,
        searchTxt
      },
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
    dispatch({
      type: 'find/updateState',
      payload: {
        searchTxt: txt,
        searchObj
      },
    });
  };

  const cancel = () => {
    dispatch({
      type: 'find/updateState',
      payload: {
        listData: [],
        searchTxt: undefined,
        searchObj: {}
      },
    });
  };
  const props = {
    vocationalList,
    sceneList,
    weaknessList,
    onOk: submit,
    onCancel: () => child.handlerCancelClick(),
    selfChoice: searchObj
  };

  const onRef = (ref) => {
    child = ref;
  };

  const onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
        payload: {
          isRefresh: true,
          txt: searchTxt,
          ...searchObj
        },
        callback,
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
        payload: {
          txt: searchTxt,
          ...searchObj
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
    };

  const listProps = {
    onRefresh,
    onScrollerTop,
    onEndReached,
    listData,
    hasMore,
    scrollerTop,
    loading: loadingList,
    dispatch,
    selectable: false,
  };

  return (
    <div>
      <SearchBar style={{ backgroundColor: '#02b7ee' }} onSubmit={search} placeholder="搜索" maxLength={8} onCancel={cancel} />
      <FilterModal onRef={onRef} form={<FilterForm {...props} hasFooter />} hasFooter={false} />
      <VideoListView {...listProps} />
    </div>
  );
};

export default connect(({ loading, find, app }) => ({
  loadingList: loading.effects['find/search'],
  find,
  app,
}))(Comp);
