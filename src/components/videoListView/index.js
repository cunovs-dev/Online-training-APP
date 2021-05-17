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
    key: 1,
    value: 'visit',
    label: '时间排序',
  },
  {
    key: 2,
    value: 'uncommitted',
    label: '最受欢迎',
  },
];

const VideoListView = (props) => {

  const { listData, hasMore, scrollerTop, onRefresh, onEndReached, onScrollerTop, loading, dispatch } = props,

    getContents = (lists) => (
      <ListView
        layoutHeader={''}
        dataSource={lists}
        layoutRow={(rowData, sectionID, rowID) => {
          return commonRow(rowData, sectionID, rowID, null, dispatch);
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
        <SelectBox title='排序' defaultChoice="最受欢迎" overlay={overlay} />
        <WhiteSpace size="xs" />
        {listData.length > 0 ? getContents(listData) : <NoContent isLoading={loading} />}
      </div>
    </div>
  );
};

export default VideoListView;
