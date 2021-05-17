/**
 * @author Lowkey
 * @date 2021/05/12 10:53:29
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Drawer } from 'components';
import { getLocalIcon, getOffsetTopByBody } from 'utils';
import ClassifyItem from './classifyitem';
import styles from './index.less';

const PrefixCls = 'drawer';


class MyDrawer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      height: '100%',
      top: 0,
      currentValue: null,
      current: '',
    };
  }

  handlerDrawerClick = (open) => {
    this.setState({
      open: !open,
    });
  };

  componentDidMount () {
    const currentTop = getOffsetTopByBody(ReactDOM.findDOMNode(this.lv)),
      currentHeight = cnhtmlHeight - currentTop;
    this.setState({
      top: currentTop,
      height: currentHeight + 'px',
    });
  }

  onChange = ({ value, label }) => {
    this.setState({
      open: false,
      currentValue: value,
      current: label,
    });
  };

  render () {
    const { open, height, top, currentValue, current } = this.state;
    const { dataCop } = this.props;
    return (
      <div className={styles[`${PrefixCls}-outer`]} ref={el => this.lv = el} style={{ height }}>
        <div className={styles[`${PrefixCls}-classify`]} style={{ padding: '10px' }}
             onClick={() => this.handlerDrawerClick(open)}>
          <Icon type={getLocalIcon('/components/classify.svg')} />
          <span>{current}</span>
        </div>
        <Drawer
          className="my-drawer"
          style={{ maxHeight: height, top }}
          enableDragHandle={false}
          contentStyle={{ color: '#A6A6A6' }}
          sidebar={<ClassifyItem data={dataCop} dispatch={this.props.dispatch} currentValue={currentValue}
                                 onChange={this.onChange} />}
          open={open}
        >
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}

export default MyDrawer;
