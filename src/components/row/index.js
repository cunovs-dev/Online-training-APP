/**
 * @author Lowkey
 * @date 2021/05/08 10:33:07
 * @Description: 列表
 */
import React from 'react';
import Tag from 'components/tag';
import { List, Icon } from 'antd-mobile';
import { getErrorImg, getCommonDate, getImages, getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'row',
  Item = List.Item,
  Brief = Item.Brief;

module.exports = {
  commonRow: ({ previewImage, videoName, praise = 0, yewu, people,videoId, previewCounts }, onClick, dispatch) => { //公共视频列表
    return (
      <div className={styles[`${PrefixCls}-common`]}>
        <Item
          thumb={previewImage}
          multipleLine
          wrap
          onClick={()=>onClick(dispatch,'lessondetails',{id:videoId})}
        >
          <span className={styles[`${PrefixCls}-common-title`]}> {videoName}</span>
          <div>
            <Tag size="xs" text={yewu} color="cyan" />
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
  consumptionRow: ({ title, integral = 0, date }) => { //公共视频列表
    return (
      <div className={styles.consumption}>
        <Item multipleLine extra={<span className={styles.num}>{`-${integral}`}</span>}>
          {title} <Brief>{getCommonDate(date, false)}</Brief>
        </Item>
      </div>
    );
  },
};
