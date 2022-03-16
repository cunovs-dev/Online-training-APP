/*
 * @Author: your name
 * @Date: 2021-12-08 16:57:16
 * @LastEditTime: 2021-12-15 10:49:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\components\discuss\index.js
 */
/**
 * @author Lowkey
 * @date 2018/10/29
 * @Description:
 */
import React from 'react';
import { getImages, getErrorImg } from 'utils';
import styles from './index.less';
 
function Dialogue (props) {
  const { createUserId: { userName = '匿名' } } = props;
  return (
    <div className={styles['dialogue-box']} key={props.id}>
      <div className={styles['dialogue-title-box']}>
        <img className={styles['dialogue-image']}
          src={getImages(props.userPhoto, '')}
          alt=""
          onError={getErrorImg}
        />
        <div className={styles['dialogue-info']}>
          <h5 className={styles['dialogue-author']}>{userName}</h5>
          <p className={styles['dialogue-times']}>
            {props.createDate}
          </p>
        </div>
      </div>
      <div className={styles['dialogue-content']}>
        <div className={'page-content'} style={{ overflow: 'hidden' }}>
          {props.txt}
        </div>
      </div>
    </div>
  );
}
 
export default Dialogue;
 
