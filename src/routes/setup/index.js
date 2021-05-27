import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, WingBlank, List, Icon, ActivityIndicator, Button, Toast, Modal } from 'components';
import Nav from 'components/nav';
import FileUpload from 'react-fileupload';
import { routerRedux } from 'dva/router';
import { getErrorImg, getImages, getLocalIcon, config, cookie } from 'utils';
import doUserAvatarUpload from 'utils/formsubmit';
import styles from './index.less';

const PrefixCls = 'setup',
  Item = List.Item,
  { baseURL, api: { SetUpAPi }, userTag } = config,
  { _cs } = cookie;


class Setup extends React.Component {
  constructor (props) {
    super(props);
  }

  handleLoginout = () => {
    this.props.dispatch({
      type: 'app/logout',
    });
  };

  showAlert = () => {
    Modal.alert('退出', '离开知创APP', [
      {
        text: '残忍退出',
        onPress: this.handleLoginout,
      },
      { text: '再看看', onPress: () => console.log('cancel') },

    ]);
  };

  handleAboutUsClick = ({ name = '关于我们' }) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/aboutus',
      query: {
        name,
      },
    }));
  };

  render () {
    const { name = '' } = this.props.location.query,
      { animating } = this.props.setup,
      uploadSuccess = (path) => {
        _cs(userTag.useravatar, path);
        this.props.dispatch({
          type: 'app/updateUsers',
          payload: {
            users: {
              photoPath: path,
            },
          },
        });
      },
      options = {
        uploadSuccess: uploadSuccess.bind(this),
        baseUrl: `${baseURL + SetUpAPi}`,
        accept: 'image/*',
        dataType: 'json',
        fileFieldName: 'photo',
        chooseFile (files) {
          doUserAvatarUpload(SetUpAPi, {}, {
            photo: files[0],
          }, {}, true)
            .then((res) => {
              this.refs.ajax_upload_file_input.value = '';
              if (res.headPortrait) {
                this.uploadSuccess(res.headPortrait);
                Toast.success('上传成功', 2);
              } else {
                Toast.fail('上传失败，请稍后再试', 2);
              }
            });
        },
      };
    const { users: { photoPath } } = this.props.app;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <WhiteSpace size="md" />
        <div>
          <List className={`${PrefixCls}-list`}>
            <Item>
              <div className={`${PrefixCls}-user-icon-upload`}>
                <FileUpload options={options}>
                  <p className={'icon-title-avatar'} ref="chooseBtn">
                    <span>更换头像</span>
                  </p>
                  <div className={'icon-img-box'}>
                    <img src={getImages(photoPath, 'user')} alt="icon" onError={getErrorImg} />
                  </div>
                </FileUpload>
              </div>
            </Item>
            <Item onClick={this.handleAboutUsClick}>
              关于我们
            </Item>
            <Item>
              版本信息
            </Item>
          </List>
          <WhiteSpace />
          <WingBlank>
            <WhiteSpace size="lg" />
            <Button className={styles.button}
                    style={{ border: 0 }}
                    type="primary"
                    onClick={this.showAlert}
            >退出</Button>
          </WingBlank>
          <ActivityIndicator animating={animating} toast text="上传中..." />
        </div>
      </div>
    );
  }
}

export default connect(({ loading, setup, app }) => ({
  loading,
  setup,
  app,
}))(Setup);
