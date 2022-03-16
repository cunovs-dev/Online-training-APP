import {useModel} from 'umi';
import {useEffect} from 'react';
import {Table, Tag, Button, Space} from 'antd';
import styles from './result.less';

export default function Result(props: object) {
  const {title = '网格长能力自评'} = props.location.query
  const {paging, summaryData, summaryLoading, pagination, setPagination} = useModel('useApp');
  const {pageSize, nowPage, total} = pagination
  useEffect(() => {
    paging({pageSize: 20,nowPage:1})
  }, [])

  const columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'userPhone',
      key: 'userPhone',
    },
    {
      title: '督导激发力',
      dataIndex: 'vae1',
      key: 'vae1',
    },
    {
      title: '维系协调力',
      dataIndex: 'vae2',
      key: 'vae2',
    },
    {
      title: '展示影响力',
      dataIndex: 'vae3',
      key: 'vae3',
    },
    {
      title: '统筹策划力',
      dataIndex: 'vae4',
      key: 'vae4',
    },
  ];
  const onPageChange = (page, pageSize) => {
    paging({
      nowPage: page,
      pageSize
    })
    setPagination({
      nowPage: page,
      pageSize
    })

  };
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grade}>问卷结果</div>
      <Table
        loading={summaryLoading}
        style={{marginBottom: 30}}
        columns={columns}
        dataSource={summaryData}
        pagination={{
          current: nowPage,
          pageSize,
          total,
          onChange: onPageChange
        }}
      />
    </>
  )
}
