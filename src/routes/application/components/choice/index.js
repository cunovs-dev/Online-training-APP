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

const CheckboxItem = Checkbox.CheckboxItem;
const data = [
  { value: 1, label: '集体学习' },
  { value: 2, label: '复制推广' },
  { value: 3, label: '创新突破' },
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
    return (
      <div>
        <List>
          {data.map(i => (
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

