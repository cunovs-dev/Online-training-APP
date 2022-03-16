/*
 * @Author: your name
 * @Date: 2021-12-24 10:11:47
 * @LastEditTime: 2021-12-24 10:43:23
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \questionnaire\src\pages\result.tsx
 */
import {useModel} from 'umi';
import {Table, Tag, Button, Space} from 'antd';
import DemoRadar from '@/components/Radar'
import DemoBar from '@/components/Bar'
import styles from './result.less';

export default function Result(props: object) {
  const {title = '网格长能力自评'} = props.location.query
  const {result, itemRes} = useModel('useApp');
  console.log(result)
  const getResult = (obj: {}) => {
    return [
      {...obj, id: '得分', key: 1},
      {
        key: 2,
        vae1: '3',
        id: '标准分',
        vae2: '3',
        vae3: '3',
        vae4: '3'
      }
    ]
  }

  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '统筹策划力',
      dataIndex: 'vae4',
      key: 'vae4',
    },
    {
      title: '协调整合力',
      dataIndex: 'vae2',
      key: 'vae2',
    },
    {
      title: '拓展影响力',
      dataIndex: 'vae3',
      key: 'vae3',
    },

    {
      title: '督导激发力',
      dataIndex: 'vae1',
      key: 'vae1',
    },
  ];
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grade}>得分</div>
      <Table style={{marginBottom: 30}} columns={columns} dataSource={getResult(result)} pagination={false} />
      <DemoRadar data={result} />
      <DemoBar data={itemRes} />
      {/*<div className={styles.button}>*/}
      {/*<Button type="primary" onClick={onSubmit}>*/}
      {/*保存报告*/}
      {/*</Button>*/}
      {/*</div>*/}
    </>
  )
}
