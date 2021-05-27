/**
 * @author Lowkey
 * @date 2021/05/14 10:46:30
 * @Description: 列表组件
 */
import React from 'react';
import { WhiteSpace, Icon, List, Layout } from 'components';
import { commonRow } from 'components/row';
import ListView from 'components/listview';
import SelectBox from 'components/selectBox';
import { handleGoto } from 'utils/commonevents';
import NoContent from 'components/nocontent';
import styles from './index.less';

const overlay = [
  {
    key: 0,
    value: 0,
    label: '综合推荐',
  },
  {
    key: 1,
    value: 1,
    label: '日期',
  },
  {
    key: 2,
    value: 2,
    label: '最受欢迎',
  },
  {
    key: 3,
    value: 3,
    label: '浏览量',
  },
];

const VideoListView = (props) => {

  const { listData, hasMore, scrollerTop, onRefresh, onEndReached, onScrollerTop, loading, dispatch, selectable = true } = props,

    getContents = (lists) => (
      <ListView
        layoutHeader={''}
        dataSource={lists}
        layoutRow={(rowData) => {
          return commonRow(rowData, handleGoto, dispatch);
        }}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        hasMore={hasMore}
        onScrollerTop={onScrollerTop.bind(null)}
        useBodyScroll={false}
        scrollerTop={scrollerTop}
      />
    );

  return (
    <div>
      <div className={styles.outer}>
        {selectable ? <SelectBox title='排序' onSort={props.onSort} defaultChoice="综合推荐" overlay={overlay} /> : null}
        <WhiteSpace size="xs" />
        {listData.length > 0 ? getContents(listData) : <NoContent isLoading={loading} />}
      </div>
    </div>
  );
};

export default VideoListView;
