/**
 * @author Lowkey
 * @date 2021/05/08 10:33:07
 * @Description: 列表
 */
import React from 'react';
import Tag from 'components/tag';
import { List, Icon } from 'antd-mobile';
import { getErrorImg, getImages, getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'row',
  Item = List.Item;

module.exports = {
  commonRow: ({ image, title, price = '0', people }, onClick) => { //公共视频列表
    return (
      <div className={styles[`${PrefixCls}-common`]}>
        <Item
          thumb={image}
          multipleLine
          wrap
          onClick={onClick}
        >
          <span className={styles[`${PrefixCls}-common-title`]}> {title}</span>
          <div>
            <Tag size="xs" text="移动" color="cyan" />
          </div>
          <div className={styles[`${PrefixCls}-common-info`]}>
            <div className={styles[`${PrefixCls}-common-info-box`]}>
             <Icon type={getLocalIcon('/components/view.svg')} />
              <span>{price}</span>
            </div>
            <div className={styles[`${PrefixCls}-common-info-box`]}>
              <Icon type={getLocalIcon('/components/praise.svg')} />
              <span>{people}</span>
            </div>
          </div>
        </Item>
      </div>
    );
  },
};
