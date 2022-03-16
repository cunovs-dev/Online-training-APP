import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Nav from 'components/nav';
import styles from './index.less';


const PrefixCls = 'aboutus';

function AboutUs ({ location, dispatch, aboutus }) {
  const { name = '关于我们' } = location.query,
    { content } = aboutus;
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <h3 className={styles[`${PrefixCls}-title`]}>终身教学平台</h3>
      <div className={styles[`${PrefixCls}-content`]}>
        <p>
         北京开放大学终身教学平台是面向北京广大市民与公众的教学实施与教学管理信息系统，是北京开放大学面向广大市民与学生提供知识服务的窗口。
        </p>
        <p>近些年来，随着移动互联网、云计算技术、数字学习内容、教育软件应用等各种技术的快速发展与逐步成熟，这些因素也正在对中国的教育领域产生巨大的影响，中国庞大的教育产业开始逐步进入转型与演变，以前的学习环境主要是以纸本教材为核心进行知识传授，通过传统课堂师生互动完成教育学习过程。在这样的教育模式下，大多数学生接受统一的标准化教育，而未来的学习环境将更多借助技术手段实现以数字资源为主，以数字技术支撑的开放式的师生互动，以及基于数字化学习平台的学生个性化学习。</p>
        <p>
         信息技术的飞速发展，同时也对教育观念、教育和学习方式产生了巨大的影响，极大的拓展了教育的时空界限，空前地提高了人们学习的兴趣、效率和能动性。各种方式的信息技术正在被大规模地引入教育领域当中，如云视频流媒体技术、试题库技术、课件开发技术、多媒体技术等，这些技术都对教育的信息化进程产生了十分重要的作用，使教育资源共享的原则得以贯彻，学习选择的自由度大大提高，因需学习、因材施教真正成为可能。
        </p>
        <p>
         基于此，北京开放大学退出了融合云计算与移动互联网的知识教学平台，将传统开放大学教育与终身教育结合，对广大市民和学生提供有目标的，因材施教的学习平台。
        </p>
      </div>
    </div>
  );
}

export default connect(({ loading, aboutus }) => ({
  loading,
  aboutus,
}))(AboutUs);
