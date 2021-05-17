import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { List } from 'components';
import { getErrorImg, getImages, getLocalIcon } from 'utils';

const Item = List.Item,
  Brief = Item.Brief,
  PrefixCls='photo'

const Photo = (props) => (
  <div>
    <List>
      <Item
        className={styles[`${PrefixCls}-item`]}
        thumb={getImages(props.path, props.type)}
        align="top"
        onClick={props.onClick}
      >{props.name}</Item>
    </List>
  </div>
);

export default Photo;
