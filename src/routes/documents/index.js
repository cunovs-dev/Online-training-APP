import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import FolderList from 'components/folderList';
import MyDrawer from 'components/drawer';
import ListView from 'components/listview';
import NoContent from 'components/nocontent';
import { List } from 'components';

const PrefixCls = 'documents';
const dataCop = [
  { value: 0, label: '前端技术', id: 0, yep: true },
  { value: 1, label: '前端开发', id: 1, yep: false },
  { value: 2, label: '后端开发', id: 2, yep: false },
  { value: 3, label: '移动开发', id: 3, yep: false },
  { value: 4, label: '大数据', id: 4, yep: false },
  { value: 5, label: '数据库', id: 5, yep: false },
];
const Comp = ({ location, dispatch, documents, loading }) => {
  const { list, hasMore, scrollerTop } = documents,
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
    },
    getContents = (lists) => {
      return (
        <ListView
          layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, rowID) => {
            return <FolderList data={rowData} key={rowID} fileIdPrefix={1} />;
          }}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          useBodyScroll={false}
          scrollerTop={scrollerTop}
        />
      );
    };
  return (
    <div>
      <Nav title="工具" dispatch={dispatch} />
      <MyDrawer dataCop={dataCop}>
        {list.length > 0 ? getContents(list) : <NoContent isLoading={loading} />}
      </MyDrawer>
    </div>
  );
};

export default connect(({ loading, documents }) => ({
  loading: loading.effects['documents/query'],
  documents,
}))(Comp);
