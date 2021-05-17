/**
 * @author Lowkey
 * @date 2021/05/11 15:32:28
 * @Description:
 */

import { Component } from 'react';
import classNames from 'classnames';
import {
  List,
  TextareaItem,
  Button,
  WhiteSpace,
  Toast,
  Icon,
} from 'components';
import { createForm } from 'rc-form';
import { Wave } from 'components/wave';
import { getLocalIcon } from 'utils';
import styles from './index.less';

let int,
  stop;
const PrefixCls = 'recognition';

class Recognition extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isVoice: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      answer: '',
    };
  }

  getVoiceText = (unit, bits, minutes) => {
    return (
      <div>
        <div>
          {`${minutes}:${bits}${unit} 松开停止`}
        </div>
      </div>
    );
  };

  addSeconds () { // 计时器
    const { unit, bits, minutes } = this.state;
    this.setState({
      unit: unit + 1,
    });
    if (unit >= 9) {
      this.setState({
        unit: 0,
        bits: bits + 1,
      });
    }
    if (bits >= 6) {
      this.setState({
        bits: 0,
        minutes: minutes + 1,
      });
    }
  }

  startTimer () { // 启动计时器
    const that = this;
    int = setInterval(() => {
      that.addSeconds();
    }, 1000);
  }

  handleVoiceRecordingStart = () => {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty();
    this.setState({
      isVoice: true,
      onRecording: true,
    });
    stop = setTimeout(() => { // 延迟1s执行
      const { isVoice, onRecording } = this.state;
      if (isVoice === true && onRecording === true) {
        cnCheckPermissions('RECORD_AUDIO', () => cnStartRecord(this.mediaFileOnSuccess.bind(this), this.mediaFileOnError.bind(this)), () => Toast.fail('获取录音权限失败'), () => this.setState({ isVoice: false }));
        this.startTimer();
      }
    }, 300);
  };
  handleVoiceRecordingEnd = () => {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty();
    cnStopRecord();
    this.setState({
      isVoice: false,
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0,
    });
    clearInterval(int);
    clearTimeout(stop);
  };

  mediaFileOnSuccess (data) {
    console.log(data);
    const { answer = '' } = this.state;
    this.setState({
      answer: `${answer}${data}`,
    });
  }

  mediaFileOnError (error) {
    console.log(error);
    handleVoiceRecordingEnd();
  }

  handlerChange = (val) => {
    this.setState({
      answer: val,
    });
  };

  handleDivClick () {
    let { isVoice, onRecording } = this.state;
    if (isVoice && onRecording) {
      cnStopRecord();
      this.setState({
        isVoice: false,
        onRecording: false,
        unit: 0,
        bits: 0,
        minutes: 0,
      });
      clearInterval(int);
      clearTimeout(stop);
    }
  }

  speaking = () => {
    const { answer = '' } = this.state;
    cnStartSpeak(() => console.log('success'), (e) => console.log(e), answer);
  };

  componentWillUnmount () {
    clearInterval(int);
    clearTimeout(stop);
  }

  getItemsValue = () => ({textInfo:this.state.answer});

  render () {
    const { getFieldProps, getFieldError } = this.props.form,
      { unit, bits, minutes, answer } = this.state;
    return (
      <div onClick={this.handleDivClick.bind(this)}>
        <div className={styles[`${PrefixCls}-outer`]}>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('textinfo', {
                  rules: [{ required: true, message: '请回答问题' }],
                })}
                clear
                value={answer}
                rows={14}
                error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
                count={500}
                onChange={this.handlerChange}
                placeholder={'在此回答'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-voice`]}>
              <div className={styles[`${PrefixCls}-outer-voice-container`]}>
                {this.state.isVoice ?
                  <div className={styles.timer}>
                    <Wave />
                    {this.getVoiceText(unit, bits, minutes)}
                  </div>
                  : null}
                {answer !== '' ? <Icon type={getLocalIcon('/components/play.svg')} onClick={this.speaking} /> : null}
                <div
                  className={classNames(styles[`${PrefixCls}-outer-voice-container-button`], { [styles.active]: this.state.isVoice })}
                  onTouchStart={this.handleVoiceRecordingStart}
                  onTouchEnd={this.handleVoiceRecordingEnd}
                >
                  语音答题
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default (createForm()(Recognition));

