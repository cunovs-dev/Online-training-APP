/**
 * @author Lowkey
 * @date 2021/05/17 13:52:51
 * @Description:
 */
import React from 'react';
import { Loader, Tag, Button, Toast } from 'components';
import { checkArr } from 'utils';
import styles from './index.less';

class FilterForm extends React.Component {
  constructor (props) {
    super(props);
    const { selfChoice = {} } = props;
    console.log(selfChoice)
    const { yw = [], cj = [] } = selfChoice;
    this.state = {
      height: document.documentElement.clientHeight - 45,
      yw,
      cj,
      fl: [],
    };
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
          this.splice(index, 1);
        }
      };
      this.state[type].remove(id);
      this.setState({
        [type]: this.state[type],
      });
    }
  };

  onSubmit = (type = '') => {
    const { yw, cj } = this.state;
    if (yw.length > 0 && cj.length > 0) {
      const data = {
        cj: cj.join(','),
        yw: yw.join(','),
      };
      this.props.onOk(data, type);
    } else {
      Toast.fail('请选择感兴趣的业务和场景');
    }
  };

  onSearch = () => {
    const { yw, cj, fl } = this.state;
    if (yw.length > 0 || cj.length > 0 || fl.length > 0) {
      const data = {
        cj: cj.join(','),
        yw: yw.join(','),
        fl: fl.join(','),
      };
      this.props.onOk(data);
    } else {
      Toast.fail('请选择感兴趣的业务和场景');
    }
  };

  getButton = (weakness) => {
    const { weaknessList } = this.props;
    if (weakness) {
      const sort = weaknessList.find(item => item.id === weakness);
      return (
        <div>
          <div className={styles.title}>短板</div>
          {sort ? <Tag className={styles.tag} disabled>{sort.title}</Tag> : null}
          <Button type="primary" onClick={() => this.onSubmit('edit')}>提交</Button>
        </div>
      );
    }
    return (
      <div>
        <div className={styles.title}>能力测评</div>
        <Button type="primary" onClick={this.onSubmit}>开始测评</Button>
      </div>
    );
  };

  render () {
    const { perfect = false, sceneList, vocationalList, weaknessList, selfChoice={} } = this.props;
    const { fl: weakness = {} } = selfChoice;
    const { yw, cj } = this.state;
    return (
      <div className={styles.outer}>
        <div>
          <div className={styles.title}>业务</div>
          {vocationalList.map(item => <Tag key={item.id} selected={yw.includes(item.id)} className={styles.tag}
                                           onChange={(select) => this.onVocationalChange(select, item, 'yw')}>{item.title}</Tag>)}
        </div>
        <div>
          <div className={styles.title}>场景</div>
          {sceneList.map(item => <Tag key={item.id} selected={cj.includes(item.id)} className={styles.tag}
                                      onChange={(select) => this.onVocationalChange(select, item, 'cj')}>{item.title}</Tag>)}
        </div>
        {
          perfect ?
            this.getButton(weakness)
            :
            <div>
              <div className={styles.title}>短板</div>
              {weaknessList.map(item => <Tag key={item.id} className={styles.tag}
                                             onChange={(select) => this.onVocationalChange(select, item, 'fl')}>{item.title}</Tag>)}
            </div>
        }
        {
          this.props.hasFooter ?
            <div className={styles.foot}>
              <Button inline size="small" style={{ marginRight: '20px' }}
                      onClick={this.props.onCancel}>取消</Button>
              <Button type="primary" inline size="small" onClick={this.onSearch}>确定</Button>
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default FilterForm;
