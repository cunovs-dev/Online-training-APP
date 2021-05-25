/**
 * @author Lowkey
 * @date 2021/04/25 10:00:13
 * @Description: From 表单可组件化 没时间拆分
 */
import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, Icon } from 'components';
import { getLocalIcon, pattern } from 'utils';
import { handleGoto } from 'utils/commonevents';
import { config } from 'utils';
import styles from './index.less';
import Tips from '../component/Tips';
import user from 'themes/images/login/user.png';
import pwd from 'themes/images/login/lock.png';

const PrefixCls = 'login';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isCodeSending: false,
      isDisabled: false,
    };
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
        Toast.fail('输入有误', 3);
      }
    });
  };

  render () {
    const { form: { getFieldProps, getFieldError }, login: { buttonState } } = this.props,
      userKey = 'username',
      powerKey = 'password';
    return (
      <div>
        <Tips title="登录" subTitle="欢迎再次回来" />
        <div className={styles[`${PrefixCls}-form`]}>
          <form>
            <WingBlank size="md">
              <InputItem placeholder="手机号码"
                         {...getFieldProps(userKey, {
                           rules: [
                             { required: true, message: '请输入手机号码' },
                             // { pattern: pattern('phone'), message: '手机号码格式有误！' },
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
            <WhiteSpace size="lg" />
            <WingBlank size="md">
              <InputItem
                type="password"
                placeholder="密码"
                {...getFieldProps(powerKey, {
                  rules: [
                    { required: true, message: '密码必修输入' },
                    // { pattern: pattern('password'), message: '6-12位且包含数字、字母、特殊字符（~!@#$%^&*等）' },
                  ],
                })}
                clear
                error={!!getFieldError(powerKey)}
                onErrorClick={() => {
                  Toast.fail(getFieldError(powerKey));
                }}
              >
                <div className={styles.icon} style={{
                  backgroundImage: `url(${pwd})`,
                }}
                />
              </InputItem>
              <WhiteSpace size="lg" />
            </WingBlank>
            <WingBlank size="md">
              <Button type="primary"
                      className={styles.button}
                      onClick={this.onSubmit.bind(this)}
                      disabled={!buttonState}
              >
                {!buttonState ? '登录中...' : '登录'}
              </Button>
            </WingBlank>
          </form>
          <WhiteSpace size="lg" />
          <div className={styles.bottom}>
            <span onClick={() => handleGoto(this.props.dispatch, 'login/register', { type: 'reset' })}>重置密码</span>
            <span className={styles.register}
                  onClick={() => handleGoto(this.props.dispatch, 'login/register')}>注册会员</span>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(({ login, loading }) => ({
  login,
  loading,
}))(createForm()(Login));
