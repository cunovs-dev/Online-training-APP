import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import classNames from 'classnames'

const PrefixCls = 'introduction'

class Introduction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handleClick () {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  componentWillMount () {

  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div
          className={classNames(styles[`${PrefixCls}-outer-content`], { [styles.open]: this.state.isOpen })}>Jquery是继prototype之后又一个优秀的Javascript框架。它是轻量级的js库 ，它兼容CSS3，还兼容各种浏览器（IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+），jQuery2.0及后续版本将不再支持IE6/7/8浏览器。jQuery使用户能更方便地处理HTML（标准通用标记语言下的一个应用）、events、实现动画效果，并且方便地为网站提供AJAX交互。jQuery还有一个比较大的优势是，它的文档说明很全，而且各种应用也说得很详细，同时还有许多成熟的插件可供选择。jQuery能够使用户的html页面保持代码和html内容分离，也就是说，不用再在html里面插入一堆js来调用命令了，只需定义id即可。
        </div>
        <div className={styles[`${PrefixCls}-outer-button`]}
             onClick={this.handleClick.bind(this)}>
          {this.state.isOpen ? '收起' : '展开'}
          </div>
      </div>
    )
  }
}

Introduction.defaultProps = {}
Introduction.propTypes = {}

export default Introduction
