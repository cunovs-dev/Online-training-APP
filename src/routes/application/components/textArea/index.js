/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:28
 * @LastEditTime: 2021-12-15 15:18:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\application\components\textArea\index.js
 */
/**
 * @author Lowkey
 * @date 2021/05/11 15:32:28
 * @Description:
 */

import { Component } from 'react';
import {
  List,
  TextareaItem,
  Button,
  Toast 
} from 'components';
import { createForm } from 'rc-form';

class TextArea extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { issueId = '', videoId = '' } = this.props;
    this.props.dispatch({
      type: 'lessondetails/getTest',
      payload: {
        videoId,
        issueId
      },
    });
  }

  onSubmit = () => {
    const { issueId = '', videoId = '' } = this.props;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = this.props.form.getFieldsValue();
        
        this.props.dispatch({
          type: 'lessondetails/sendTest',
          payload: {
            ...data,
            issueId,
            videoId
          }
        });
      } else {
        Toast.fail('请输入内容');
      }
    });
  }

  render () {
    const { getFieldProps, getFieldError } = this.props.form;
    const { answer, loading } = this.props;

    if (answer) {
      return (
        <div>{answer}</div>
      );
    } 
    return (
      <div>
        <List.Item>
          <TextareaItem
            {...getFieldProps('txt', {
              rules: [{ required: true, message: '请回答问题' }],
            })}
            rows={6}
            error={!!getFieldError('txt') && Toast.fail(getFieldError('txt'))}
            count={500}
            placeholder={'在此回答'}
          />
        </List.Item>
        <Button loading={loading} onClick={this.onSubmit} type="primary" size="small">提交</Button>
      </div>
    );
  }
}

export default (createForm()(TextArea));

