/**
 * @author Lowkey
 * @date 2019/04/03 15:45:07
 * @Description:
 */
import React from 'react';
import { Icon, Toast } from 'components';
import { getLocalIcon, getCommonDate, renderSize } from 'utils';
import styles from './index.less';

const getIcon = (type) => {
  if (RegExp(/pdf/)
    .exec(type)) {
    return '/components/PDF.svg';
  } else if (RegExp(/word/)
    .exec(type)) {
    return '/components/DOCX.svg';
  } else if (RegExp(/xlsb/)
    .exec(type)) {
    return '/components/EXCEL.svg';
  } else if (RegExp(/^(\s|\S)+(jpeg|jpg|png|JPG|PNG|)+$/)
    .exec(type)) {
    return '/components/IMAGE.svg';
  }
  return '/components/file.svg';
};

class FolderList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDownLoad: -1,
    };
  }

  fileClick = (item, i) => {

  };

  render () {
    const { data, key } = this.props;
    const { isDownLoad } = this.state;
    const { filename = '', timemodified, filesize = 0 } = data;
    return (
      <div
        key={key}
        className={styles.outer}
      >
        <div className={styles.img}>
          <Icon type={getLocalIcon(getIcon(filename))} size="lg" color="#22609c" />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <span>{filename}</span>
            <span>{getCommonDate(timemodified)}</span>
          </div>
          <div className={styles.right}>
            renderSize(filesize)
          </div>
        </div>
      </div>
    );
  }
}

export default FolderList;
