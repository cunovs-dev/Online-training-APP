import React from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { getOffsetTopByBody } from 'utils';
import TitleBox from 'components/titlecontainer';
import { Layout } from 'components';
import RefreshLoading from 'components/refreshloading';
import styles from './index.less';

let PrefixCls = 'cn-listview',
  { BaseLine } = Layout;
let timer,
  timer2;

class Comp extends React.Component {
  static defaultProps = {
    dataSource: [],
    useBodyScroll: false,
    hasMore: false,
    pageSize: 10,
    onRefresh: '',
    layoutHeader: '',
    layoutFooter: '',
    layoutRow: '',
    layoutSeparator: '',
    scrollerTop: 0,
    onScrollerTop: ''
  };

  constructor (props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight
    };
  }

  componentWillMount () {
    this._isMounted = true;
  }

  componentDidMount () {
    let el = ReactDOM.findDOMNode(this.lv),
      hei = cnhtmlHeight - getOffsetTopByBody(el);
    if (this._isMounted) {
      timer = setTimeout(() => {
        let { dataSource } = this.state;
        if (this.props.dataSource.length) {
          dataSource = dataSource.cloneWithRows(this.props.dataSource);
        }
        this.setState({
          dataSource,
          height: hei,
          refreshing: false,
          isLoading: false
        });
      }, 0);
      timer2 = setTimeout(() => {
        if (this.lv && this.props.scrollerTop > 0) {
          this.lv.scrollTo(0, this.props.scrollerTop);
        }
      }, 100);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource)
      });
    }
  }

  componentDidUpdate () {
    if (this.props.useBodyScroll) {
      document.body.style.overflow = 'auto';
    }
  }

  componentWillUnmount () {
    this._isMounted = false;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 0 && this.props.onScrollerTop && this.props.useBodyScroll) {
      this.props.onScrollerTop(scrollTop);
    }
    clearTimeout(timer);
    clearTimeout(timer2);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    if (this.props.onRefresh) {
      const cb = () => {
        this.setState({
          refreshing: false,
          isLoading: false
        });
      };
      this.props.onRefresh(cb.bind(this));
    } else {
      setTimeout(() => {
        this.setState({
          refreshing: false,
          isLoading: false
        });
      }, 600);
    }
  };

  onEndReached = (event) => {
    if (this.state.isLoading || !this.props.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    if (this.props.onEndReached) {
      const cb = () => {
        this.setState({
          isLoading: false
        });
      };
      this.props.onEndReached(cb.bind(this));
    } else {
      setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 600);
    }
  };

  layoutSeparator (sectionID, rowID) {
    if (this.props.layoutSeparator) {
      return this.props.layoutSeparator(sectionID, rowID);
    }
    return (<div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#f6f6f6',
        height: 8
        // borderTop: '1px solid #ECECED',
        // borderBottom: '1px solid #ECECED',
      }}
    />);
  }

  layoutRow (rowData, sectionID, rowID) {
    if (this.props.layoutRow) {
      return this.props.layoutRow(rowData, sectionID, rowID);
    }
    return '';
  }

  layoutHeader () {
    if (this.props.layoutHeader) {
      return <TitleBox title={this.props.layoutHeader()} />;
    }
    return '';
  }

  layoutFooter () {
    if (this.props.layoutFooter) {
      return this.props.layoutFooter(this.state.isLoading);
    }
    return (<div style={{ textAlign: 'center' }}>
      {this.props.hasMore ? <RefreshLoading svg={'/components/refreshloading.svg'} /> : <BaseLine />}
    </div>);
  }

  srcoll = (e) => {
    if (this.props.onScrollerTop) {
      this.props.onScrollerTop(e.target.scrollTop);
    }
  };

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <ListView
          ref={ele => this.lv = ele}
          initialListSize={this.props.dataSource.length || 10}
          dataSource={this.state.dataSource}
          renderHeader={this.layoutHeader.bind(this)}
          renderFooter={this.layoutFooter.bind(this)}
          renderRow={this.layoutRow.bind(this)}
          renderSeparator={this.layoutSeparator.bind(this)}
          useBodyScroll={this.props.useBodyScroll}
          style={this.props.useBodyScroll ? {} : {
            height: this.state.height
          }}
          onScroll={(e) => this.srcoll(e)}
          pullToRefresh={
            <PullToRefresh
              distanceToRefresh={60}
              damping={200}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={100}
          pageSize={this.props.pageSize}
        />
      </div>
    );
  }
}

export default Comp;
