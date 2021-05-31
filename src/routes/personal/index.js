import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { handleGoto } from 'utils/commonevents';
import { _cg } from 'utils/cookie';
import { config } from 'utils';
import TitleBox from 'components/titlecontainer';
import Tag from 'components/tag';
import Nav from 'components/nav';
import styles from './index.less';

const { userTag: { userName, userPhone } } = config;

const Personal = ({ dispatch, personal, location }) => {
  const { query: { name } } = location;
  const { vocationalList, sceneList, weaknessList } = personal;

  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <List>
        <List.Item extra={_cg(userName)}>真实姓名</List.Item>
        <List.Item extra={_cg(userPhone)}>手机号</List.Item>
      </List>
      <WhiteSpace />
      <div className={styles.content}>
        <TitleBox title="业务偏好" sup={<span style={{ color: '#02B7EE' }}
                                          onClick={() => handleGoto(dispatch, 'perfectInformation')}>重新选择</span>} />
        <div className={styles.tagBox}>
          {vocationalList.length > 0 && vocationalList.map(item => <Tag key={item.id} inline size="xs" text={item.title}
                                                                        color="green" />)}
        </div>
        <TitleBox title="场景偏好" sup={<span style={{ color: '#02B7EE' }}
                                          onClick={() => handleGoto(dispatch, 'perfectInformation')}>重新选择</span>} />
        <div className={styles.tagBox}>
          {sceneList.length > 0 && sceneList.map(item => <Tag key={item.id} inline size="xs" text={item.title}
                                                              color="cyan" />)}
        </div>
        <TitleBox title="短板" sup='' />
        <div className={styles.tagBox}>
          {weaknessList.length > 0 && weaknessList.map(item => <Tag key={item.id} inline size="xs" text={item.title} color="red" />)}
        </div>
      </div>
    </div>
  );
};
export default connect(({ loading, personal }) => ({
  loading,
  personal,
}))(Personal);
