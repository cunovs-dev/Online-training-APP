import React from 'react';
import { List } from 'components';
import { getErrorImg, getImages, getLocalIcon } from 'utils';

const PrefixCls = 'photo';

const Photo = (props) => (
  <div>
    <List>
      <List.Item
        onClick={props.onClick}
        extra={props.dept}
      >{props.name}
      </List.Item>
    </List>
  </div>
);

export default Photo;
