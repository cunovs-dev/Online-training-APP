/**
 * @author Lowkey
 * @date 2021/05/11 15:32:28
 * @Description:
 */

import { Component } from 'react';
import {
  List,
  Checkbox,
} from 'components';
import styles from './index.less';

const CheckboxItem = Checkbox.CheckboxItem;
const data = [
  { value: 1, label: '集体学习' },
  { value: 2, label: '复制推广' },
  { value: 3, label: '创新突破' },
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

  }

  onChange = (val) => {
    console.log(val);
  };

  getItemsValue = () => (this.props.form.getFieldsValue());

  render () {
    const { question = '', answer = data, type } = this.props;
    const res = type === 'recognition' ? data2 : data;
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
      </div>
    );
  }
}

export default Choice;

