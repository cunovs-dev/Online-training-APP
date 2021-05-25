import React from 'react';
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';

const PrefixCls = 'banner';

class Banner extends React.Component {
  state = {
    slideIndex: 0,
    isLoad: false,
  };

  render () {
    const { bannerDatas, handleClick } = this.props;
    return (
      <div className={styles[`${PrefixCls}-outer`]} style={{ clear: 'both' }}>
        <Carousel
          autoplayInterval={5000}
          autoplay
          infinite
          dotStyle={{
            background: '#fff',
            opacity: '0.5',
            width: '12px',
            height: '3px',
            borderRadius: '0',
          }}
          dotActiveStyle={{
            background: '#fff',
            width: '12px',
            height: '4px',
            borderRadius: '0',
          }}
        >
          {bannerDatas && bannerDatas.map((data, i) => (
            <div
              className={styles[`${PrefixCls}-image`]}
              key={`a_${i}`}
              onClick={handleClick}
            >
              <img
                ref={el => this.banner = el}
                src={`${data.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
              />
              {this.props.hasTitle ? <div>{data.courseTitle}</div> : ''}
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

Banner.propTypes = {
  bannerDatas: PropTypes.array.isRequired,
};
Banner.defaultProps = {
  bannerDatas: [],
  hasTitle: false,
  name: '',
};
export default Banner;
