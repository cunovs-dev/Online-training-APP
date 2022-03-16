/**
 * @author Lowkey
 * @date 2021/05/14 11:19:31
 * @Description: 下拉刷新列表 不传参数为假下拉刷新
 */
import React from 'react';
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getOffsetTopByBody } from 'utils';

let timer,
  timer2,
  timer3;

class Refresh extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      down: true,
      height: '100vh',
      refreshing: props.refreshing,
    };
  }

  componentWillMount () {
    this._isMounted = true;
  }

  componentDidMount () {
    let el = ReactDOM.findDOMNode(this.ptr);
    if (this.ptr && el) {
      const hei = cnhtmlHeight - getOffsetTopByBody(el);
      if (this._isMounted) {
        timer = setTimeout(() => this.setState(() => ({
          height: hei,
        })), 300);
        timer2 = setTimeout(() => {
          if (this.props.scrollerTop > 0) {
            el.scrollTop = this.props.scrollerTop;
          }
        }, 300);
      }
    }
  }



  defaultOnRefresh = () => {
      this.setState({ refreshing: true });
      timer3 = setTimeout(() => {
        this.setState({ refreshing: false });
      }, 1000);
  };

  componentWillUnmount () {
    this._isMounted = false;
    if (this.ptr && (ReactDOM.findDOMNode(this.ptr))) {
      let scrollTop = ReactDOM.findDOMNode(this.ptr).scrollTop;
      if (scrollTop >= 0 && this.props.onScrollerTop) {
        this.props.onScrollerTop(scrollTop);
      }
    }
    clearTimeout(timer);
    clearTimeout(timer2);
    clearTimeout(timer3);
  }

  render () {
    return (
      <PullToRefresh
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        damping={160}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={this.props.onRefresh || this.defaultOnRefresh}
        distanceToRefresh={25}
      >
        {this.props.children || ''}
      </PullToRefresh>
    );
  }
}

Refresh.defaultProps = {
  refreshing: false,
  scrollerTop: 0,
  onRefresh: null,
};

export default Refresh;
