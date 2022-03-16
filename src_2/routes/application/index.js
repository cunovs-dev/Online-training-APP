/**
 * @author Lowkey
 * @date 2021/05/11 13:42:42
 * @Description: run!!!!!
 */

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Button, WingBlank, Toast } from 'components';
import Nav from 'components/nav';
import Recognition from './components/recognition';
import TextArea from './components/textArea';
import { consumptionRow } from 'components/row';
import { routerRedux } from 'dva/router';
import Choice from './components/choice';
import styles from './index.less';


class Application extends React.Component {
  constructor (props) {
    super(props);
  }

  onSubmit = () => {
    // console.log(this.formRef.getItemsValue());
    // dispatch({
    //   type: 'login/authentication',
    //   payload: this.formRef.getItemsValue()
    // });
    this.props.dispatch(routerRedux.goBack());
    Toast.success('提交成功');

  };

  getAnswer = (answer = '') => {
    const res = [];
    const arr = answer.split('/');
    arr.map((item, i) => res.push({
      label: item,
      value: i + 1,
    }));
    return res.slice(0, 4);
  };

  getContent = (type) => {
    const { infoData } = this.props.lessondetails;
    const { question, answer } = infoData;
    if (type === 'recognition') {
      // return <Recognition wrappedComponentRef={(form) => this.formRef = form} />;
      return <Choice question={question} answer={this.getAnswer(answer)} type={type}
                     wrappedComponentRef={(form) => this.formRef = form} />;
    }
    if (type === 'choice') {
      return <Choice question={question} answer={this.getAnswer(answer)}
                     wrappedComponentRef={(form) => this.formRef = form} />;
    }
    if (type === 'textarea') {
      return <TextArea wrappedComponentRef={(form) => this.formRef = form} />;
    }
  };

  render () {
    const { location: { query }, dispatch } = this.props, { name = '', type = '' } = query;

    return (
      <div>
        <Nav title={name} dispatch={dispatch} />
        <div className={styles.content}>
          {this.getContent(type)}
          <WhiteSpace />
          <WingBlank size="lg">
            <Button type="primary" onClick={this.onSubmit}>提交</Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, application, lessondetails }) => ({
  loading,
  lessondetails,
  application,
}))(Application);
