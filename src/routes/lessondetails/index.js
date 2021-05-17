/**
 * @author Lowkey
 * @date 2021/04/26 13:03:52
 * @Description:
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import { Tabs, WhiteSpace, Badge, Icon, Toast } from 'components';
import Tag from 'components/tag';
import Praise from 'components/praise';
import ReactDOM from 'react-dom';
import { myNoteRow } from 'components/row';
import { handleGoto, handleBuildingClick } from 'utils/commonevents';
import { getOffsetTopByBody, getLocalIcon } from 'utils';
import Photo from 'components/photo';
import video from './jquery.mp4';
import pic from './pic.jpg';
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

    video.onplay = () => {
      Toast.info(checkConnection());
    };
  }

  handlePraiseClick = () => {
    this.props.dispatch({
      type: 'lessondetails/updateState',
      payload: {
        isPraise: true,
      },
    });
  };
  collectClick = () => {
    this.props.dispatch({
      type: 'lessondetails/updateState',
      payload: {
        isCollect: true,
      },
    });
  };

  getChildren = (arr) => (
    arr && arr.map((data, i) => <InfoBox key={i} {...data}
                                         handleClick={handleBuildingClick.bind(null, this.props.dispatch)} />)
  );

  render () {
    const { isPraise, isCollect, infoData } = this.props.lessondetails;
    const praiseProps = {
      isPraise,
      num: 0,
      handlePraiseClick: this.handlePraiseClick,
    };
    const getvideo = () => {
      return (
        <video key={1}
               ref={el => this.video = el}
               width="100%"
               preload="none"
               poster={pic}
               src={video}
               controlsList="nodownload"
               controls="controls"
        />
      );
    };
    const renderSup = () => (
      <div className={styles.extra}>
        <Praise {...praiseProps} />
        <Collection isCollect={isCollect} handlerClick={this.collectClick} />
      </div>
    );
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <TransparentHeader dispatch={this.props.dispatch} offset={this.state.tabOffset} />
        <div>
          {getvideo()}
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
              <Tag className={styles.tag} size="xs" text="个人能力" color="green" />
              <div className={styles.title}>云知梦教学总监</div>
              <div className={styles.question}>中国PHP高效培训第一人</div>
            </div>
            <WhiteSpace size='md' />
            <TitleBox title="知识贡献者" sup="" />
            <Photo
              path="https://img-ph-mirror.nosdn.127.net/l4Sh6C4IheRcW92RS3ID4g==/6608871924468841382.jpg?imageView&quality=100&thumbnail=75y75"
              type="user" name="戴志欢" />
            <Container
              title="猜你喜欢"
              children={this.getChildren(infoData)}
              moreClick={() => handleGoto(this.props.dispatch, 'videoList', { name: '猜你喜欢' })}
            />
          </div>

          <div ref={el => this.vl = el} style={{ height: this.state.height }}>
            <WhiteSpace size='md' />
            {
              applies.map(item => <div key={item.name} ><ApplicationBox
                title={item.name}
                handlerClick={() => handleGoto(this.props.dispatch, 'application', {
                  name: item.name,
                  type: item.type,
                })} />
                <WhiteSpace />
              </div>)
            }
            {/*<div className={styles.question}>*/}
            {/*<div className={styles.title}>*/}
            {/*<Icon style={{ marginRight: 10 }} size="lg" type={getLocalIcon('/components/question.svg')} />*/}
            {/*课后检测*/}
            {/*</div>*/}
            {/*<div className={styles.content}>*/}
            {/*客户需求交流的四个环节是什么？*/}
            {/*</div>*/}
            {/*<Recognition />*/}
            {/*</div>*/}
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
