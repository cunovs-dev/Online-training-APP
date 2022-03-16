/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import Tag from 'components/tag';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'infobox';

const InfoBox = (props) => {
  return (
    <div className={styles[`${PrefixCls}-outer`]} onClick={props.handleClick}>
      <div className={styles[`${PrefixCls}-outer-image`]} style={{ backgroundImage: `url(${props.previewImage})` }} />
      <div className={styles[`${PrefixCls}-outer-content`]}>
        <h3>{props.videoName}</h3>
        <div className={styles[`${PrefixCls}-outer-question`]}>{props.question}</div>
      </div>
      {/*<Tag className={styles.tag} size="xs" text='本省' color="#2CCD5D" />*/}
    </div>
  );
};

InfoBox.defaultProps = {
  image: '',
  title: 'hxi',
  price: '免费',
  number: '212',
  question: '',
  tag: '本省',
};
InfoBox.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default InfoBox;
