/* eslint-disable no-trailing-spaces */
import React from 'react';
import { Carousel } from 'antd-mobile';
import Tag from 'components/tag';
import styles from './index.less';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';

const PrefixCls = 'hotCourse';

class HotCourse extends React.Component {
  state = {
    data: [],
    slideIndex: 0,
    isLoad: false,
  };

  componentWillMount () {

  }

  render () {
    const { slideIndex } = this.state,
      bannerDatas = this.props.bannerDatas;
    return (
      <div className={styles[`${PrefixCls}-outer`]} style={{ clear: 'both' }}>
        <div className={styles[`${PrefixCls}-outer-title`]}>
          <div className={styles[`${PrefixCls}-outer-title-left`]}><Icon type={getLocalIcon('/components/hot.svg')} />猜你喜欢
          </div>
          <div className={styles[`${PrefixCls}-outer-title-right`]} onClick={this.props.moreClick}>
            更多>
          </div>
        </div>
        <Carousel
          className="space-carousel"
          selectedIndex={slideIndex}
          infinite
          dots={false}
          cellSpacing={10}
          slideWidth={0.6}
        >
          {bannerDatas && bannerDatas.map((data, i) => (
            <div
              className={styles[`${PrefixCls}-image`]}
              key={`a_${i}`}
              onClick={()=>this.props.handleClick(this.props.dispatch, 'lessondetails', { id: data.videoId })}
            >
              <Tag className={styles.tag} size="xs" text={data.yewu} color="#2CCD5D" />
              <img
                ref={el => this.banner = el}
                src={data.previewImage}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  if (!this.state.isLoad) {
                    this.setState({
                      isLoad: true,
                    });
                    window.dispatchEvent(new Event('resize'));
                  }
                }}
              />
              <div className={styles.text}>{data.videoName}</div>
              <div className={styles.question}>{data.question}</div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default HotCourse;
