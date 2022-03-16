/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:28
 * @LastEditTime: 2021-12-15 15:19:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\application\components\choice\index.js
 */
/**
 * @author Lowkey
 * @date 2021/05/11 15:32:28
 * @Description:
 */

import { Component } from 'react';
import {
  List,
  Checkbox,
  Button,
} from 'components';
import Tag from 'components/tag';
import styles from './index.less';

const CheckboxItem = Checkbox.CheckboxItem;
const data = [
  { value: '集体学习', label: '集体学习' },
  { value: '复制推广', label: '复制推广' },
  { value: '创新突破', label: '创新突破' },
];
const data2 = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' },
];

class Choice extends Component {
  constructor (props) {
    super(props);
    this.state = {
      res: []
    };
  }

  onChange = (val) => {
    const arr = this.state.res;
    if (arr.includes(val)) {
      let index = arr.indexOf(val);
      arr.splice(index, 1);
    } else {
      arr.push(val);
    }
    this.setState({
      res: arr
    });
  };

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
    if (this.state.res.length > 0) {
      this.props.dispatch({
        type: 'lessondetails/sendTest',
        payload: {
          txt: this.state.res.join(','),
          issueId,
          videoId
        }
      });
    } else {
      Toast.fail('至少选择一个答案');
    }
  }

  renderRes = (answer) => {
    const arr = answer.split(',');
    return (
      <div>
        {
          arr.map(item => {
            return (
              <Tag inline key={item} color="pink" text={item} />
            );
          })
        }
      </div>
    );
  }

  render () {
    const { question = '', answer, type, loading } = this.props;
    const res = type === 'recognition' ? data2 : data;
    
    if (answer) {
      return this.renderRes(answer);
    } 
    return (
      <div>
        {type === 'recognition' ? <div className={styles.title}>请回答以下哪些作法是案例中的关键步骤？</div> : null}
        <List>
          {res.map(i => (
            <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
              {i.label}
            </CheckboxItem>
          ))}
        </List>
        <Button loading={loading} onClick={this.onSubmit} type="primary" size="small">提交</Button>
      </div>
    );
  }
}

export default Choice;

