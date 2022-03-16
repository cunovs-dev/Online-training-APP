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
  } else if (RegExp(/xlsb|xlsx/)
    .exec(type)) {
    return '/components/EXCEL.svg';
  } else if (RegExp(/ppt/)
    .exec(type)) {
    return '/components/PPT.svg';
  } else if (RegExp(/txt/)
    .exec(type)) {
    return '/components/TXT.svg';
  } else if (RegExp(/folder/)
    .exec(type)) {
    return '/components/fOLDER.svg';
  } else if (RegExp(/^(\s|\S)+(jpeg|jpg|png|JPG|PNG|)+$/)
    .exec(type)) {
    return '/components/IMAGE.svg';
  }
  return '/components/FILE.svg';
};

class FolderList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDownLoad: -1,
    };
  }

  downLoaded = (state = -1) => {
    this.setState({
      isDownLoad: state,
    });
  };

  downLoadFile = (data) => {

    const { fileId, fileName, fileType, fileUri, fileContentType } = data;
    cnGetOrDownAndOpenFile({
      fileName: `${fileId}_${fileName}`,
      fileUrl: fileUri,
      mimeType: fileContentType,
      fileType,
      callback: () => this.downLoaded(Number(fileId)),
    }, (e) => {
      Toast.info('正在打开文件...');
      this.downLoaded(-1);
    }, (error) => {
      this.downLoaded(-1);
      let msg = '';
      if (error.message) {
        msg = error.message;
      } else if (error.body) {
        msg = JSON.parse(error.body).error;
      }
      Toast.offline(msg || '发生未知错误。');
    });
  };

  fileClick = (item) => {
    const { fileId = '' } = item;
    this.props.getFile(fileId, this.downLoadFile);
  };

  render () {
    const { data } = this.props;
    const { isDownLoad } = this.state;
    const { fileName = '', fileOwner, fileSize = 0, fileType, fileId } = data;
    return (
      <div
        className={styles.outer}
        onClick={isDownLoad > -1 ? null : () => this.fileClick(data)}
      >

        <div className={styles.img}>
          <Icon type={getLocalIcon(getIcon(fileType.toLowerCase()))} size="lg" color="#22609c" />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <span>{fileName}</span>
            <span>{fileOwner}</span>
          </div>
          <div className={styles.right}>
            {isDownLoad === Number(fileId) ?
              <Icon type={'loading'} size="xxs" color="#22609c" /> : renderSize(fileSize)}

          </div>
        </div>
      </div>
    );
  }
}

export default FolderList;
