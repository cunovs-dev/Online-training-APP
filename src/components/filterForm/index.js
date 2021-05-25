/**
 * @author Lowkey
 * @date 2021/05/17 13:52:51
 * @Description:
 */
import React from 'react';
import { defaultBusiness, defaultScene, defaultShortBoard } from 'utils/defaults';
import { Loader, Tag, Button, Toast } from 'components';
import styles from './index.less';

class FilterForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      height: document.documentElement.clientHeight - 45,
      yw: [],
      cj: [],
    };
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  onVocationalChange = (select, { id }, type) => {
    if (select) {
      this.setState({
        [type]: [...this.state[type], id],
      });
    } else {
      Array.prototype.remove = function (val) {
        const index = this.indexOf(val);
        if (index > -1) {
          console.log(this);
          this.splice(index, 1);
        }
      };
      this.state[type].remove(id);
      this.setState({
        [type]: this.state[type],
      });
    }
  };

  onSubmit = () => {
    const { yw, cj } = this.state;
    if (yw.length > 0 && cj.length > 0) {
      const data = {
        cj: cj.join(','),
        yw: yw.join(','),
      };
      this.props.onOk(data);
    } else {
      Toast.fail('请选择感兴趣的业务和场景');
    }
  };

  render () {
    const { perfect = false, sceneList, vocationalList } = this.props;
    return (
      <div className={styles.outer}>
        <div>
          <div className={styles.title}>业务</div>
          {vocationalList.map(item => <Tag key={item.id} className={styles.tag}
                                           onChange={(select) => this.onVocationalChange(select, item, 'yw')}>{item.title}</Tag>)}
        </div>
        <div>
          <div className={styles.title}>场景</div>
          {sceneList.map(item => <Tag key={item.id} className={styles.tag}
                                      onChange={(select) => this.onVocationalChange(select, item, 'cj')}>{item.title}</Tag>)}
        </div>
        {
          perfect ?
            <div>
              <div className={styles.title}>能力测评</div>
              <Button type="primary" onClick={this.onSubmit}>开始测评</Button>
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
