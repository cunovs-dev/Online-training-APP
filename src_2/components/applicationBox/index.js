/**
 * @author Lowkey
 * @date 2021/05/11 11:19:26
 * @Description: 学习应用问题容器
 */

import React from 'react';
import TitleBox from 'components/titlecontainer';
import { Button, Icon } from 'components';

import { getLocalIcon } from 'utils';
import styles from './index.less';

const ApplicationBox = (props) => {
  const { title, children,handlerClick } = props;
  return (
    <div className={styles.container}>
      <TitleBox title={title} sup="" />
      <div className={styles.content}>
        {
          children ?
            children
            :
            <div className={styles.empty}>
              <div><Icon type={getLocalIcon('/components/think.svg')} /></div>
              <div className={styles.btn} onClick={handlerClick}>立即答题</div>
            </div>
        }
      </div>
    </div>
  );
};

ApplicationBox.defaultProps = {
  title: '未定义',
  children: null,
  handlerClick:null
};
export default ApplicationBox;
