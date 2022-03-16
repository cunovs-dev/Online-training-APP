/**
 * @author Lowkey
 * @date 2021/04/26 13:03:52
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import TitleBox from 'components/titlecontainer';
import { Tabs, WhiteSpace, Badge, Toast, Button, Modal } from 'components';
import { routerRedux } from 'dva/router';
import Tag from 'components/tag';
import Praise from 'components/praise';
import ReactDOM from 'react-dom';
import ListView from 'components/listview';
import NoContent from 'components/nocontent';
import Dialogue from 'components/discuss';
import { Player, BigPlayButton, ControlBar, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';
import { handleGoto } from 'utils/commonevents';
import { getOffsetTopByBody, getVideoTips, cookie } from 'utils';
import Photo from 'components/photo';
import Collection from 'components/collection';
import ApplicationBox from 'components/applicationBox';
import TransparentHeader from 'components/transparentheader';
import Container from 'components/container/index';
import InfoBox from 'components/infobox/index';
import Choice from '../application/components/choice';
import TextArea from '../application/components/textArea';
import styles from './index.less';

const { _cs, _cg } = cookie;

const PrefixCls = 'lessondetails',
  applies = [
    // {
    //   name: '学习通关',
    //   type: 'recognition',

    // },
    {
      name: '经验复制',
      type: 'choice',
      issueId: '1',
      
    },
    {
      name: '心得领悟',
      type: 'textarea',
      issueId: '2',
    },
    {
      name: '案例需求',
      type: 'textarea',
      issueId: '3',
    },
  ];
const tabs = [
  { title: <Badge>案例介绍</Badge> },
  { title: <Badge>学习应用</Badge> },
  { title: <Badge>评论</Badge> },
];

class LessonDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: cnhtmlHeight,
      tabOffset: 0,
      videoState: {},
      started: false
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = 0;
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.vl),
      tabsDom = ReactDOM.findDOMNode(this.tabs),
      currentHeight = getOffsetTopByBody(element);
    this.setState({
      height: cnhtmlHeight - currentHeight,
      tabOffset: getOffsetTopByBody(tabsDom),
    });

    if (this.player) {
      this.player.onplay = () => {
        Toast.info(checkConnection());
      };
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }
  }


  componentWillUnmount () {
    const { player } = this.player.getState();
    const { currentTime } = player;
    const { query: { id = '' } } = this.props.location;
    const { resultId } = this.props.lessondetails;
    _cs(id, currentTime);
    if (resultId !== '') {
      this.setTime(resultId);
    }
  }

  setTime = (resultId = undefined) => {
    const { query: { id = '' } } = this.props.location;
    this.props.dispatch({
      type: 'lessondetails/setTime',
      payload: {
        videoId: id,
        resultId
      }
    });
  }

  collectClick = () => {
    const { location: { query }, lessondetails: { infoData } } = this.props;
    const { id } = query;
    const { isCollect } = infoData;
    this.props.dispatch({
      type: 'lessondetails/collect',
      payload: {
        videoId: id,
        isCollect: !Number(isCollect),
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
        isPraise: !Number(isPraise),
      },
    });
  };

  getChildren = (arr) => (
    arr && arr.map((data, i) => (<InfoBox key={i}
      {...data}
      handleClick={() => handleGoto(this.props.dispatch, 'lessondetails', { id: data.videoId })}
    />))
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

  renderQuestion = (type, issueId) => {
    const { location: { query }, lessondetails: { testData } } = this.props;
    const { id } = query;
  
    const answer = testData[issueId] || null;
    
    if (type === 'recognition') {
      return (
        <div>
          <Choice type="recognition"
            wrappedComponentRef={(form) => this.formRef = form}
          />
         
        </div>
      );
    }
    if (type === 'choice') {
      return (
        <div>
          <Choice type="choice"
            issueId={issueId}
            videoId={id}
            loading={this.props.adding}
            answer={answer}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    }
    if (type === 'textarea') {
      return (
        <div>
          <TextArea loading={this.props.adding} answer={answer} videoId={id} issueId={issueId} dispatch={this.props.dispatch} />
        </div>
      );
    }
  };

  onRefresh = (callback) => {
    const { query: { id } } = this.props.location;
    this.props.dispatch({
      type: `${PrefixCls}/fetchReply`,
      payload: {
        isRefresh: true,
        videoId: id
      },
      callback,
    });
  }
  onEndReached = (callback) => {
    const { query: { id } } = this.props.location;
    this.props.dispatch({
      type: `${PrefixCls}/fetchReply`,
      payload: {
        videoId: id
      },
      callback,
    });
  }
  onScrollerTop = (top) => {
    if (typeof top !== 'undefined' && !isNaN(top * 1)) {
      this.props.dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          scrollerTop: top,
        },
      });
    }
  };

   getContents = (lists) => {
     const { hasMore = false, scrollerTop = 0 } = this.props.lessondetails;
     return (
       <ListView
         layoutHeader={''}
         dataSource={lists}
         layoutRow={(rowData, sectionID) => {
           return <Dialogue key={sectionID} {...rowData} />;
         }}
         onEndReached={this.onEndReached}
         onRefresh={this.onRefresh}
         hasMore={hasMore}
         onScrollerTop={this.onScrollerTop.bind(null)}
         useBodyScroll={false}
         scrollerTop={scrollerTop}
       />
     );
   };

   
  handleStateChange=(state, prevState) => {
    const { query: { id } } = this.props.location;
    const startTime = _cg(id);
    if (!state.hasStarted && state.isActive) {
      this.setTime();
      // if (Number(startTime) > 0) {
      //   Toast.offline(`上次播放至${formatDuring(Number(startTime))}`);
      // }
    }
  }


  render () {
    const { infoData, recommendData, selectKey, replyList } = this.props.lessondetails;
    const { query: { id } } = this.props.location;
    const { videoName, scene, yewu, ownerDept, ownerName, ownerAvatarUri, hasAuth, integral, praise, previewImage, videoSrc, question, isCollect, isPraise, addresses } = infoData;
    const praiseProps = {
      isPraise: Boolean(Number(isPraise)),
      num: praise,
      handlePraiseClick: this.praiseClick,
    };
    const startTime = _cg(id);
    
    const getvideo = (pic, src) => {
      // if (!Number(hasAuth)) {
      //   return (
      //     <div className={styles.pay}>
      //       <div className={styles.bg}
      //         ref={el => this.video = el}
      //         style={{ backgroundImage: `url(${previewImage})` }}
      //       />
      //       <Button className={styles.btn}
      //         type="primary"
      //         size="small"
      //         onClick={this.showAlert}
      //       >{`消耗${integral}积分观看`}</Button>
      //     </div>
      //   );
      // }
      return (
        <div className={styles.pay}>
          <Player preload="metadata" src={src} ref={el => this.player = el} poster={Number(_cg(id)) > 0 ? null : pic} startTime={Number(startTime)} >
            <ControlBar autoHide={false} className={styles.button} >
              <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} />
              <VolumeMenuButton vertical />
            </ControlBar>
            <BigPlayButton position="center" />
          </Player>
        </div>
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
        <div className={styles.videoBox}>
          {getvideo(previewImage, videoSrc)}
        </div>
        <Tabs
          tabs={tabs}
          ref={el => this.tabs = el}
          page={selectKey}
          onChange={(tab, index) => {
            this.props.dispatch({
              type: 'lessondetails/updateState',
              payload: {
                selectKey: index,
              },
            });
            if (index === 2) {
              this.props.dispatch({
                type: 'lessondetails/fetchReply',
                payload: {
                  videoId: id,
                  isRefresh: true,
                },
              });
            }
          }}
        >
          <div ref={el => this.vl = el} style={{ height: this.state.height }}>
            <WhiteSpace size="md" />
            <TitleBox title="基本信息" sup={renderSup()} />
            <div className={styles.baseInfo}>
              <Tag className={styles.tag}
                size="xs"
                text={getVideoTips(yewu === '' ? scene : yewu, yewu === '' ? 'scene' : 'yw')}
                color="green"
              />
              <div className={styles.title}>{videoName}</div>
              <div className={styles.subtitle}>{addresses}</div>
              <div className={styles.question}>
                <Tag className={styles.tag}
                  inline
                  size="xs"
                  text="问题?"
                  color="pink"
                />
                {question}
              </div>
            </div>
            <WhiteSpace size="md" />
            <TitleBox title="知识贡献者" sup="" />
            <Photo
              path={ownerAvatarUri}
              type="user"
              name={ownerName}
              dept={ownerDept}
            />
            <WhiteSpace size="md" />
            <Container
              title="猜你喜欢"
              children={this.getChildren(recommendData)}
              moreClick={() => handleGoto(this.props.dispatch, 'videoList', { name: '猜你喜欢', fetchType: 'recommend' })}
            />
          </div>

          <div style={{ height: this.state.height }}>
            <WhiteSpace size="md" />
            {
              applies.map(item => (<div key={item.name}><ApplicationBox
                title={item.name}
                children={this.renderQuestion(item.type, item.issueId)}
                // handlerClick={() => handleGoto(this.props.dispatch, 'application', {
                //   name: item.name,
                //   type: item.type,
                // })}
              />
              <WhiteSpace />
              </div>))
            }
          </div>

          <div ref={el => this.discuss = el} style={{ height: this.state.height }}>
            <TitleBox title={'评论'}
              sup={
                <a 
                  style={{ color: '#108ee9' }} 
                  onClick={
                    () => this.props.dispatch(routerRedux.push({
                      pathname: '/reply',
                      query: {
                        id
                      }
                    }))}
                >
                   评论
                </a>
              }
            />
            {replyList.length > 0 ? this.getContents(replyList) : <NoContent isLoading={this.props.loading} />}
          </div>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ loading, lessondetails }) => ({
  loading: loading.effects['lessondetails/fetchReply'],
  adding: loading.effects['lessondetails/sendTest'],
  lessondetails,
}))(LessonDetails);
