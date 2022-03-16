/**
 * @author Lowkey
 * @date 2021/05/11 15:32:28
 * @Description:
 */

import { Component } from 'react';
import {
  List,
  TextareaItem,
} from 'components';
import { createForm } from 'rc-form';

class TextArea extends Component {
  constructor (props) {
    super(props);

  }

  getItemsValue = () => (this.props.form.getFieldsValue());

  render () {
    const { getFieldProps, getFieldError } = this.props.form
    return (
        <div>
            <List.Item>
              <TextareaItem
                {...getFieldProps('textinfo', {
                  rules: [{ required: true, message: '请回答问题' }],
                })}
                rows={6}
                error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
                count={500}
                placeholder={'在此回答'}
              />
            </List.Item>
        </div>
    );
  }
}

export default (createForm()(TextArea));

