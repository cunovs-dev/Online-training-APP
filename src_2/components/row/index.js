/**
 * @author Lowkey
 * @date 2021/05/08 10:33:07
 * @Description: 列表
 */
import React from 'react';
import Tag from 'components/tag';
import { List, Icon } from 'antd-mobile';
import { getErrorImg, getVideoTips, getCommonDate, getImages, getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'row',
  Item = List.Item,
  Brief = Item.Brief;

module.exports = {
  commonRow: ({ previewImage, videoName, praise = 0, yewu, scene, people, videoId, previewCounts }, onClick, dispatch, fetchType) => { //公共视频列表
    return (
      <div className={styles[`${PrefixCls}-common`]}>
        <Item
          thumb={previewImage}
          multipleLine
          wrap
          onClick={() => onClick(dispatch, 'lessondetails', { id: videoId })}
        >
          <span className={styles[`${PrefixCls}-common-title`]}> {videoName}</span>
          <div>
            <Tag size="xs" text={getVideoTips(fetchType === 'cj' ? scene : yewu, fetchType)} color="cyan" />
          </div>
          <div className={styles[`${PrefixCls}-common-info`]}>
            <div className={styles[`${PrefixCls}-common-info-box`]}>
              <Icon type={getLocalIcon('/components/view.svg')} />
              <span>{previewCounts}</span>
            </div>
            <div className={styles[`${PrefixCls}-common-info-box`]}>
              <Icon type={getLocalIcon('/components/praise.svg')} />
              <span>{praise}</span>
            </div>
          </div>
        </Item>
      </div>
    );
  },
  consumptionRow: ({ title, integral = 0,types, createTime }) => { //公共视频列表
    return (
      <div className={styles.consumption}>
        <Item multipleLine extra={<span className={styles.num}>{`${types==='1'?'-':'+'}${integral}`}</span>}>
          {types==='1'?'购买课程':'充值积分'} <Brief>{createTime}</Brief>
        </Item>
      </div>
    );
  },
};
