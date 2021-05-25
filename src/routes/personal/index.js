import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import TitleBox from 'components/titlecontainer';
import Tag from 'components/tag';
import Nav from 'components/nav';
import styles from './index.less'

const Personal = ({ dispatch, personal, location }) => {
  const { query: { name } } = location;
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <List>
        <List.Item extra={'张三'}>真实姓名</List.Item>
        <List.Item extra={'1316565656'}>手机号</List.Item>
      </List>
      <WhiteSpace />
     <div className={styles.content}>
       <TitleBox title="业务偏好" sup={<span style={{color:'#02B7EE'}}>重新选择</span>} />
       <div className={styles.tagBox}>
         <Tag size="xs" text="个人能力" color="green" />
       </div>
       <TitleBox title="场景偏好" sup={<span style={{color:'#02B7EE'}}>重新选择</span>} />
       <div className={styles.tagBox}>
         <Tag size="xs" text="个人能力" color="green" />
       </div>
     </div>
    </div>
  );
};
export default connect(({ loading, personal }) => ({
  loading,
  personal,
}))(Personal);
