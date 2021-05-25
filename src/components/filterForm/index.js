/**
 * @author Lowkey
 * @date 2021/05/17 13:52:51
 * @Description:
 */
import React from 'react';
import { defaultBusiness, defaultScene, defaultShortBoard } from 'utils/defaults';
import { Loader, Tag, Button } from 'components';
import styles from './index.less';

class FilterForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      height: document.documentElement.clientHeight - 45,
      isLoading: false,
    };
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  render () {
    const { perfect = false } = this.props;
    return (
      <div className={styles.outer}>
        <div>
          <div className={styles.title}>业务</div>
          {defaultBusiness.map(item => <Tag className={styles.tag}>{item.title}</Tag>)}
        </div>
        <div>
          <div className={styles.title}>场景</div>
          {defaultScene.map(item => <Tag className={styles.tag}>{item.title}</Tag>)}
        </div>
        {
          perfect ?
            <div>
              <div className={styles.title}>能力测评</div>
              <Button type="primary">开始测评</Button>
            </div>
            :
            <div>
              <div className={styles.title}>短板</div>
              {defaultShortBoard.map(item => <Tag className={styles.tag}>{item.title}</Tag>)}
            </div>
        }
      </div>
    );
  }
}

export default FilterForm;
