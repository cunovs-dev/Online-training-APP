/**
 * @author Lowkey
 * @date 2021/04/25 10:48:22
 * @Description: 注册
 */
import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, Icon } from 'components';
import { getLocalIcon, pattern } from 'utils';
import { routerRedux } from 'dva/router';
import { config } from 'utils';
import styles from './index.less';
import Tips from '../component/Tips';
import user from 'themes/images/login/user.png';
import pwd from 'themes/images/login/lock.png';

const PrefixCls = 'login';

class register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isCodeSending: false,
      count: 60,
      isDisabled: false,
    };
    const { location: { query } } = props, { type = 'register' } = query;
    this.timer = null;
    this.title = type === 'reset' ? '重置密码' : '登录';
    this.subTitle = type === 'reset' ? '手机号+验证码重置密码' : '免费注册会员';
    this.placeholder = type === 'reset' ? '新密码' : '密码';
  }

  moveInput = () => { // 解决android键盘挡住input
    this.refs.button.scrollIntoView(true);
  };

  countDown = () => {
    this.setState({
      count: --this.state.count,
    });
    if (this.state.count < 1) {
      clearInterval(this.timer);
      this.setState({
        isCodeSending: false,
        isDisabled: false,
        count: 60,
      });
    }
  };
  startCountDown = () => {
    this.setState({
      isCodeSending: true,
      isDisabled: true,
    });
    const that = this;
    this.timer = setInterval(() => {
      that.countDown();
    }, 1000);
  };

  onValidateCodeClick = () => {
    this.props.form.validateFields(['phone'], {
      force: true,

    }, (error) => {
      if (!error) {
        this.setState({
          isCodeSending: true,
          isDisabled: true,
        })
        this.startCountDown()
        this.props.dispatch({
          type: 'login/sendLoginCode',
          payload: {
            ...this.props.form.getFieldsValue(),
          },
        })
      } else {
        Toast.fail('请输入正确的手机号', 3)
      }
    })
  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
          this.props.dispatch({
            type: 'login/login',
            payload: {
              ...this.props.form.getFieldsValue(),
            },
          });

      } else {
        Toast.fail('请输入正确的信息', 2);
      }
    });
  };

  componentWillUnmount () {
    clearInterval(this.timer)
  }



  render () {
    const { form: { getFieldProps, getFieldError }, login: { buttonState }, location: { query } } = this.props,
      { type = 'register' } = query,
      userKey = 'phone',
      codeKey = 'code';
    return (
      <div>
        {/*<div className={styles.back} onClick={() => this.props.dispatch(routerRedux.goBack())}><Icon type="left" />快速登录*/}
        {/*</div>*/}
        <Tips title={this.title} subTitle={this.subTitle} />
        <div className={styles[`${PrefixCls}-form`]}>
          <form>
            <WingBlank size="md">
              <InputItem placeholder="手机号"
                         {...getFieldProps(userKey, {
                           rules: [
                             { required: true, message: '请输入手机号码' },
                             { pattern: pattern('phone'), message: '手机号码格式有误！' },
                           ],
                         })}
                         clear
                         error={!!getFieldError(userKey)}
                         onErrorClick={() => {
                           Toast.fail(getFieldError(userKey));
                         }}
              >
                <div className={styles.icon} style={{
                  backgroundImage: `url(${user})`,
                }}
                />
              </InputItem>
            </WingBlank>
            <WhiteSpace />
            <WingBlank size="md">
              <div className={styles.codeBox}>
                <InputItem
                  placeholder="验证码"
                  {...getFieldProps(codeKey, {
                    rules: [{ required: true, message: '请输入验证码' }],
                  })}
                  clear
                  error={!!getFieldError(codeKey)}
                  onErrorClick={() => {
                    Toast.fail(getFieldError(codeKey));
                  }}
                >
                  <div className={styles.icon} style={{
                    backgroundImage: `url(${pwd})`,
                  }}
                  />
                </InputItem>
                <Button
                  inline
                  size="small"
                  className={styles.codeBtn}
                  onClick={this.onValidateCodeClick}
                  disabled={this.state.isDisabled}
                >
                  {
                    this.state.isCodeSending ?
                      <span>{`${this.state.count}s重新获取`}</span>
                      :
                      <span>获取验证码</span>
                  }
                </Button>
              </div>
              <WhiteSpace size="lg" />
            </WingBlank>
            <WingBlank size="md">
              <Button type="primary"
                      className={styles.button}
                      onClick={this.onSubmit.bind(this)}
                      disabled={!buttonState}
              >
                {
                  type === 'reset' ?
                    !buttonState ? '重置中...' : '重置密码'
                    :
                    !buttonState ? '正在登录...' : '登录'
                }
              </Button>
            </WingBlank>
          </form>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}


export default connect(({ login, loading }) => ({
  login,
  loading,
}))(createForm()(register));
