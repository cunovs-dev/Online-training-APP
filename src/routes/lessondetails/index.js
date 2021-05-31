/**
 * @author Lowkey
 * @date 2021/04/26 13:03:52
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import TitleBox from 'components/titlecontainer';
import { Tabs, WhiteSpace, Badge, Icon, Toast, Button, Modal } from 'components';
import Tag from 'components/tag';
import Praise from 'components/praise';
import ReactDOM from 'react-dom';
import { myNoteRow } from 'components/row';
import { handleGoto } from 'utils/commonevents';
import { getOffsetTopByBody, getLocalIcon, getVideoTips } from 'utils';
import Photo from 'components/photo';
import Collection from 'components/collection';
import ApplicationBox from 'components/applicationBox';
import TransparentHeader from 'components/transparentheader';
import Container from 'components/container/index';
import InfoBox from 'components/infobox/index';
import styles from './index.less';

const PrefixCls = 'lessondetails',
  applies = [
    {
      name: '学习通关',
      type: 'recognition',
    },
    {
      name: '经验复制',
      type: 'choice',
    },
    {
      name: '心得领悟',
      type: 'textarea',
    },
    {
      name: '案例需求',
      type: 'textarea',
    },
  ];
const tabs = [
  { title: <Badge>案例介绍</Badge> },
  { title: <Badge>学习应用</Badge> },
];

class LessonDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: cnhtmlHeight,
      tabOffset: 0,
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = 0;
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.vl),
      tabs = ReactDOM.findDOMNode(this.tabs),
      video = ReactDOM.findDOMNode(this.video),
      currentHeight = getOffsetTopByBody(element);
    this.setState({
      height: cnhtmlHeight - currentHeight,
      tabOffset: getOffsetTopByBody(tabs),
    });

    if (video.onplay) {
      video.onplay = () => {
        Toast.info(checkConnection());
      };
    }
  }

  collectClick = () => {
    const { location: { query }, lessondetails: { infoData } } = this.props;
    const { id } = query;
    const { isCollect } = infoData;
    this.props.dispatch({
      type: 'lessondetails/collect',
      payload: {
        videoId: id,
        isCollect: !Boolean(Number(isCollect)),
      },
    });
  };
  praiseClick = () => {
    const { location: { query }, lessondetails: { infoData } } = this.props;
    const { id } = query;
    const { isPraise } = infoData;
    this.props.dispatch({
      type: 'lessondetails/praise',
      payload: {
        videoId: id,
        isPraise: !Boolean(Number(isPraise)),
      },
    });
  };

  getChildren = (arr) => (
    arr && arr.map((data, i) => <InfoBox key={i} {...data}
                                         handleClick={() => handleGoto(this.props.dispatch, 'lessondetails', { id: data.videoId })} />)
  );

  payCourse = () => {
    const { location: { query } } = this.props;
    const { id } = query;
    this.props.dispatch({
      type: 'lessondetails/payCourse',
      payload: {
        videoId: id,
      },
    });
  };

  showAlert = () => {
    const { infoData } = this.props.lessondetails;
    const { integral } = infoData;
    Modal.alert('兑换课程', `兑换将消耗${integral}积分`, [
      {
        text: '再想想',
        onPress: () => console.log('cancel'),
      },
      { text: '立即兑换', onPress: this.payCourse },

    ]);
  };

  render () {
    const { infoData, recommendData } = this.props.lessondetails;
    const { videoName, scene, yewu, hasAuth, integral, praise, previewImage, videoSrc, question, isCollect, isPraise } = infoData;
    const praiseProps = {
      isPraise: Boolean(Number(isPraise)),
      num: praise,
      handlePraiseClick: this.praiseClick,
    };
    const getvideo = (pic, src) => {
      if (!!!Number(hasAuth)) {
        return (
          <div className={styles.pay}>
            <div className={styles.bg} ref={el => this.video = el}
                 style={{ backgroundImage: `url(${previewImage})` }} />
            <Button className={styles.btn} type="primary" size="small"
                    onClick={this.showAlert}>{`消耗${integral}积分观看`}</Button>
          </div>
        );
      }
      return (
        <video
          ref={el => this.video = el}
          width="100%"
          preload="none"
          poster={pic}
          src={src}
          controlsList="nodownload"
          controls="controls"
        />
      );
    };
    const renderSup = () => (
      <div className={styles.extra}>
        <Praise {...praiseProps} />
        <Collection isCollect={Boolean(Number(isCollect))} handlerClick={this.collectClick} />
      </div>
    );
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <TransparentHeader dispatch={this.props.dispatch} offset={this.state.tabOffset} />
        <div>
          {getvideo(previewImage, videoSrc)}
        </div>
        <Tabs
          tabs={tabs}
          ref={el => this.tabs = el}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
        >
          <div style={{ height: this.state.height }}>
            <WhiteSpace size='md' />
            <TitleBox title="基本信息" sup={renderSup()} />
            <div className={styles.baseInfo}>
              <Tag className={styles.tag} size="xs" text={getVideoTips(yewu)} color="green" />
              <div className={styles.title}>{videoName}</div>
              <div className={styles.question}>{question}</div>
            </div>
            <WhiteSpace size='md' />
            <TitleBox title="知识贡献者" sup="" />
            <Photo
              path="https://img-ph-mirror.nosdn.127.net/l4Sh6C4IheRcW92RS3ID4g==/6608871924468841382.jpg?imageView&quality=100&thumbnail=75y75"
              type="user" name="戴志欢" />
            <Container
              title="猜你喜欢"
              children={this.getChildren(recommendData)}
              moreClick={() => handleGoto(this.props.dispatch, 'videoList', { name: '猜你喜欢' })}
            />
          </div>

          <div ref={el => this.vl = el} style={{ height: this.state.height }}>
            <WhiteSpace size='md' />
            {
              applies.map(item => <div key={item.name}><ApplicationBox
                title={item.name}
                handlerClick={() => handleGoto(this.props.dispatch, 'application', {
                  name: item.name,
                  type: item.type,
                })} />
                <WhiteSpace />
              </div>)
            }
          </div>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ loading, lessondetails }) => ({
  loading,
  lessondetails,
}))(LessonDetails);
