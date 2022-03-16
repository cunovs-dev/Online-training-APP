import {useEffect, useState} from 'react';
import {useModel} from 'umi';
import {Button, Form, Alert, message, Switch, Progress, Radio, Input} from 'antd';
import styles from './index.less';

const arr = Array.from({length: 11}, (v, k) => k);
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};
const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1)
    .match(reg);
  return r;
};
const RadioBox = (props: []) => {
  const [form] = Form.useForm();
  const {submit, submitting} = useModel('useApp');
  // @ts-ignore
  const {data} = props
  const [val, setVal] = useState({});
  const [pid, setPid] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [submitVal, setSubmitVal] = useState({});
  const [rules, setRules] = useState({});
  const [checked, setChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const onChange = (pid: string, id: string, e: object) => {
    setVal(() => ({[id]: e.target.value}));
    // @ts-ignore
    setPid(pid);
    // @ts-ignore
    setCurrentId(id)
  };
  const sums = (arr, view: boolean) => {
    return arr.reduce(function (prev, curr) {
      if (prev + curr > 10 && view) {
        return prev
      } else {
        return prev + curr;
      }
    });
  };
  const getSum = (val: object, index: number, view = false) => {
    const obj = val[index];
    if (typeof(obj) === 'object') {
      return sums(Object.values(obj), view)
    }
  };

  const getValue = (val, pid, id) => {
    if (JSON.stringify(val) !== '{}') {
      if (val[pid]) {
        if (val[pid][id] !== undefined) {
          if (Object.keys(val[pid]).length > 3 && getSum(submitVal, pid) !== 10) {
            message.warning('每题总分必须等于10');
            delete val[pid][currentId];
            return val[pid][id]
          } else {
            return val[pid][id]
          }
        } else {
          return null
        }
      }
    }
  };
  useEffect(() => {
   const token = queryURL('token')
   setHasToken(Boolean(token))
  }, []);
  useEffect(() => {
    if (pid !== null) setSubmitVal((submitVal => {
      if (!([pid] in submitVal)) {
        return {...submitVal, ...{[pid]: val}}
      } else {
        submitVal[pid] = Object.assign(submitVal[pid], val)
        return Object.assign({}, submitVal) //巨坑
      }
    }))
  }, [val]);

  useEffect(() => {
    Object.keys(submitVal).map(item => {
      if (Object.keys(submitVal[item]).length === 4) {
        const limit = Object.values(submitVal[item]).every((val) => (val < 5))
        setRules((rules) => {
          return {...rules, ...{[item]: limit}}
        })
      }
    })
  }, [submitVal]);

  const submitValue = (obj) => {
    let newObj = {}
    Object.keys(obj).map(item => {
      newObj = Object.assign(newObj, obj[item])
    });
    return newObj
  };

  const onSubmit = (values) => {

    const itemObj = Object.values(submitVal);
    const isAllChoose = itemObj.every(item => Object.keys(item).length === 4);
    const isAllRules = Object.values(rules).every(item => !item);
    if (Object.keys(submitVal).length < 3 || !isAllChoose) {
      message.error('请检查您的回答，不能空答！')
    } else if (!isAllRules) {
      message.error('至少有一题目为5分及5分以上！')
    } else {
      submit({...submitValue(submitVal), ...values})
    }
  };

  const checkedChange = () => {
    setChecked(!checked)
  };

  const renderAlert = (rules, item) => {
    if (rules[item]) {
      return <Alert style={{marginBottom: 20}} message="至少有一题目为5分及5分以上。" type="error" />
    }
  }
  return (
    <div className={styles.outer}>
      {
        data && data.map((content: object, i: number) => {
          const {question, key, item} = content
          return (
            <div key={i}>
              <div className={styles.question}>{question}</div>
              <Progress
                strokeColor={{
                  from: '#e97a26',
                  to: '#d0250d',
                }}
                strokeWidth={16}
                format={(percent) => percent / 10}
                style={{margin: 10}}
                percent={getSum(submitVal, key, true) * 10}
                status="active"
              />
              <div className={styles.content}>
                {renderAlert(rules, key)}
                <div className={styles.top}>
                  {
                    arr.map(item => {
                      return <div key={item}>{item}</div>
                    })
                  }
                </div>
                <div className={styles.mid}>
                  {item.map(cur => {
                    return (
                      <div key={cur.name}>
                        <div className={styles.text}>{cur.text}</div>
                        <Radio.Group
                          value={getValue(submitVal, key, cur.name)}
                          className={styles.radio}
                          name={cur.text}
                          onChange={(e) => onChange(key, cur.name, e)}
                          size="large">
                          {
                            arr.map(item => {
                              return (
                                <Radio key={item} value={item} />)
                            })
                          }
                        </Radio.Group>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })
      }
      {/*<Switch className={styles.switch} checkedChildren="匿名" unCheckedChildren="实名" checked={checked}*/}
      {/*onChange={checkedChange} />*/}
      <Form
        {...layout}
        form={form}
        onFinish={onSubmit}
      >
        <>
        {
           !hasToken?
           <Form.Item
           label="姓名"
           name="username"
           rules={[
             {required: true, message: "请填写您的姓名"}
           ]}
         >
           <Input style={{width: '160px'}} />
         </Form.Item>
         :
         null
        }
         
         {
           !hasToken?
           <Form.Item
           label="手机号码"
           name="userphone"
           rules={[
             {required: true,message: '请填写您的手机号'},
             {
               pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
               message: '请检查手机号码是否正确'
             }
           ]}
         >
           <Input style={{width: '200px'}} />
         </Form.Item>
         :
         null
         }
          {/*<Form.Item*/}
          {/*label="工作单位"*/}
          {/*name="userdept"*/}
          {/*>*/}
          {/*<Input style={{width: '200px'}} />*/}
          {/*</Form.Item>*/}
        </>
        <Form.Item>
          <Button loading={submitting} type="primary" block htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default RadioBox
