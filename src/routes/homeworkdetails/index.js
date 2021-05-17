import React from 'react';
import Nav from 'components/nav';
import { connect } from 'dva';
import { Toast, Button } from 'antd-mobile';
import { getWebSocketUrl } from 'utils';

const text = {
  null: '开始识别', // 最开始状态
  init: '开始识别', // 初始化状态
  ing: '结束识别', // 正在录音状态
  end: '开始识别', // 结束状态
};


class Ai extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      status: 'null',
      language: 'zh_cn',
      appId: '7508b1bd',
      resultText: '',
      audioData: [],
      mediaFile: '',
    };
    this.timer = null;
  }

  toBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  connectWebSocket = () => {
    return getWebSocketUrl()
      .then(url => {
        console.log(url);
        let iatWS;
        if ('WebSocket' in window) {
          iatWS = new WebSocket(url);
        } else {
          Toast.fail('不支持WebSocket');
          return;
        }
        this.webSocket = iatWS;
        this.setState({
          status: 'init',
        });
        iatWS.onopen = e => {
          this.setState({
            status: 'ing',
          });
          // 重新开始录音
          // this.webSocket.send('sdfsdfsdfs')
          this.webSocketSend();
        };
        iatWS.onmessage = e => {
          console.log(e);
          this.result(e.data);
        };
        iatWS.onerror = e => {
          console.log('err', e);
          this.recorderStop();
        };
        iatWS.onclose = e => {
          console.log('close', e);
          this.recorderStop();
        };
      });
  };

  webSocketSend () {
    const { audioData, appId, language, accent = 'mandarin', status } = this.state;
    if (this.webSocket.readyState !== 1) {
      return;
    }
    let audioParam = audioData.splice(0, 1280);
    var params = {
      common: {
        app_id: appId,
      },
      business: {
        language: language, //小语种可在控制台--语音听写（流式）--方言/语种处添加试用
        domain: 'iat',
        accent: accent, //中文方言可在控制台--语音听写（流式）--方言/语种处添加试用
        vad_eos: 5000,
        dwa: 'wpgs', //为使该功能生效，需到控制台开通动态修正功能（该功能免费）
      },
      data: {
        status: 0,
        format: 'audio/L16;rate=16000',
        encoding: 'raw',
        audio: this.toBase64(audioParam),
      },
    };
    this.webSocket.send(JSON.stringify(params));
    const that = this;
    this.timer = setInterval(() => {
      // websocket未连接
      if (that.webSocket.readyState !== 1) {
        that.setState({
          audioData: [],
        });
        clearInterval(that.timer);
        return;
      }
      if (audioParam.length === 0) {
        console.log(status);
        if (status === 'ing') {
          that.webSocket.send(
            JSON.stringify({
              data: {
                status: 2,
                format: 'audio/L16;rate=16000',
                encoding: 'raw',
                audio: '',
              },
            }),
          );
          that.setState({
            audioData: [],
          });
          clearInterval(that.timer);
        }
        return false;
      }
      audioParam = audioData.splice(0, 1280);
      // 中间帧
      that.webSocket.send(
        JSON.stringify({
          data: {
            status: 1,
            format: 'audio/L16;rate=16000',
            encoding: 'raw',
            audio: this.toBase64(audioParam),
          },
        }),
      );
    }, 40);
  }

  result = (resultData) => {
    // 识别结束
    console.log(resultData);
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
      let data = jsonData.data.result;
      let str = '';
      let resultStr = '';
      let ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w;
      }
      // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
      // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
      //   if (data.pgs) {
      //     if (data.pgs === 'apd') {
      //       // 将resultTextTemp同步给resultText
      //       this.setResultText({
      //         resultText: this.resultTextTemp,
      //       });
      //     }
      //     // 将结果存储在resultTextTemp中
      //     this.setResultText({
      //       resultTextTemp: this.resultText + str,
      //     });
      //   } else {
      //     this.setResultText({
      //       resultText: this.resultText + str,
      //     });
      //   }
      // }
      // if (jsonData.code === 0 && jsonData.data.status === 2) {
      //   this.webSocket.close();
      // }
      // if (jsonData.code !== 0) {
      //   this.webSocket.close();
      //   console.log(`${jsonData.code}:${jsonData.message}`);
    }
  };


  mediaFileOnSuccess (blob, params) {
    console.log('blob',blob,'params',params);
  }

  // 暂停录音
  recorderStop = () => {
    // safari下suspend后再次resume录音内容将是空白，设置safari下不做suspend
    let {mediaFil } = this.state
     cnStopRecord(this.state.mediaFile);
    this.setState(() => ({
      status: 'end',
    }));
  };


  recorderStart = () => {
    let mediaFile = cnStartRecord('', this.mediaFileOnSuccess.bind(this));
    console.log(mediaFile);
    this.setState({
      mediaFile
    })
    // this.connectWebSocket();
  };

  render () {
    const { dispatch } = this.props;
    const { status } = this.state;
    return (
      <div>
        <Nav dispatch={dispatch} />
        <Button onClick={this.recorderStart}>开始</Button>
        <Button onClick={this.recorderStop}>stop</Button>
      </div>
    );
  }
}

export default connect(({ loading, ai }) => ({
  loading,
  ai,
}))(Ai);
