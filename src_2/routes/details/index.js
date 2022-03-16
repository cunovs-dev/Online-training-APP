import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace, Icon } from 'components';
import { getLocalIcon, getTitle } from 'utils';
// import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'details';

class Details extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  componentWillUnmount () {

  }

  render () {
    const { name = '' } = this.props.location.query,
      { currentData: { content, title, date }, isOpen, viewImages, viewImageIndex } = this.props.details,
      getContents = () => {
        return {
          __html: content,
        };
      },
      handleDivClick = (e) => {
        if (e.target.tagName === 'IMG') {
          let src = e.target.src,
            curImageIndex = -1;
          if (src && (curImageIndex = viewImages.indexOf(src)) != -1) {
            this.props.dispatch({
              type: 'details/updateState',
              payload: {
                isOpen: true,
                viewImageIndex: curImageIndex,
              },
            });
          }
        }
      },
      onClose = () => {
        this.props.dispatch({
          type: 'details/updateState',
          payload: {
            isOpen: false,
          },
        });
      };
    return (
      <div>
        <Nav title={getTitle(name)} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            {title}
          </div>
          <div className={styles[`${PrefixCls}-outer-info`]}>
            <div className={styles[`${PrefixCls}-outer-info-date`]}>{date}</div>
          </div>
          <WhiteSpace size="sm" />
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div dangerouslySetInnerHTML={getContents()} onClick={handleDivClick} />
          </div>
        </div>
        {/*{*/}
          {/*isOpen && viewImageIndex !== -1 ?*/}
            {/*<WxImageViewer onClose={onClose} urls={viewImages} index={viewImageIndex} /> : ''*/}
        {/*}*/}
      </div>
    );
  }
}

export default connect(({ loading, details }) => ({
  loading,
  details,
}))(Details);
