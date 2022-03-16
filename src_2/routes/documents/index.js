import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import FolderList from 'components/folderList';
import MyDrawer from 'components/drawer';
import ListView from 'components/listview';
import NoContent from 'components/nocontent';
import { List } from 'components';

const PrefixCls = 'documents';

const Comp = ({ location, dispatch, documents, loading }) => {
  const { list, hasMore, scrollerTop, types } = documents,
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
    onChange = (id) => {
      dispatch({
        type: 'documents/queryList',
        payload: {
          flag: id,
          isRefresh: true,
        },
      });
    },
    getFile = (id, callback) => {
      dispatch({
        type: 'documents/queryFile',
        payload: {
          id,
        },
        callback,
      });
    },
    getContents = (lists) => {
      return (
        <ListView
          layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData) => {
            return <FolderList data={rowData} getFile={getFile} />;
          }}
          onEndReached={onEndReached}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          useBodyScroll={false}
          scrollerTop={scrollerTop}
        />
      );
    };
  return (
    <div>
      <Nav title="工具" isGoBack={false} dispatch={dispatch} />
      <MyDrawer dataCop={types} onChange={onChange}>
        {list.length > 0 ? getContents(list) : <NoContent isLoading={loading} />}
      </MyDrawer>
    </div>
  );
};

export default connect(({ loading, documents }) => ({
  loading: loading.effects['documents/query'],
  documents,
}))(Comp);
