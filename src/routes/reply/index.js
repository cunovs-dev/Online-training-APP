/*
 * @Author: your name
 * @Date: 2021-12-08 17:55:46
 * @LastEditTime: 2021-12-16 09:39:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\reply\index.js
 */
import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  TextareaItem,
  Toast,
} from 'components';
import styles from './index.less';


const PrefixCls = 'reply';

class Reply extends Component {
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  }

  onSubmit = () => {
    const { query: { id = '' } } = this.props.location;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = this.props.form.getFieldsValue();
        this.props.dispatch({
          type: 'reply/reply',
          payload: {
            ...data,
            videoId: id,
          },
          callback: () => {
            this.props.dispatch({
              type: 'lessondetails/fetchReply',
              payload: {
                videoId: id,
                isRefresh: true,
              },
            });
          }
        });
      } else {
        Toast.fail('请输入内容');
      }
    });
  }
  renderRight = () => {
    return (
      <div onClick={this.onSubmit}>发送</div>
    );
  }
  render () {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Nav title="评论" dispatch={this.props.dispatch} renderNavRight={this.renderRight()} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('txt', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入内容' }],
                })}
                rows={10}
                count={200}
                placeholder={'请输入,最多100字'}
              />
            </List.Item>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, reply }) => ({
  loading,
  reply,
}))(createForm()(Reply));
