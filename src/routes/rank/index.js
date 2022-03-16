/*
 * @Author: your name
 * @Date: 2021-12-09 11:02:18
 * @LastEditTime: 2021-12-16 17:13:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\routes\rank\index.js
 */
import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List } from 'components';
import { routerRedux } from 'dva/router';
import { getLocalIcon } from 'utils';
import NoContent from 'components/nocontent';
import Nav from 'components/nav';
import rankBg from '../../themes/images/others/rankBg.jpg';
import rankImg from '../../themes/images/others/rankImg.png';
import styles from './index.less';

const rankIcon = ['/rank/left1.svg', '/rank/left2.svg', '/rank/left3.svg'];
const rankIcons = ['/rank/right1.svg', '/rank/right2.svg', '/rank/right3.svg'];

function Rank ({ location, dispatch, rank, loading }) {
  const { name = '排行榜' } = location.query,
    { rankList, myRank } = rank;
  const { ROW_NO, LATEST_INTEGRAL } = myRank;

  return (
    <div className={styles.outer} style={{ backgroundImage: `url(${rankBg})` }}>
      <Nav title={name} dispatch={dispatch} color="transparent" />
      <img className={styles.img} src={rankImg} alt="" />
     
      <div className={styles.container}>
      
        <div className={styles.list}>
          <List.Item
            thumb={
              <div className={styles.rank}>
                {
                  ROW_NO < 4 ? <Icon type={getLocalIcon(`${rankIcon[ROW_NO - 1]}`)} /> :
                  <span className={styles.index}>{ROW_NO}</span>
                }
              </div>
            }
            extra={
              <div className={styles.rank}>
                {`${LATEST_INTEGRAL}分`}
              </div>
            }
          >
            <span>我自己</span>
          </List.Item>
          <WhiteSpace size="lg" />
          {
            cnIsArray(rankList) && rankList.length > 0 ?
              rankList.map((item, i) => {
                const { latestIntegral, userId = {} } = item;
                const { userName = '匿名' } = userId;
                return (
                  <List.Item
                    key={i}
                    thumb={
                      <div className={styles.rank}>
                        {
                          i < 3 ? <Icon type={getLocalIcon(`${rankIcon[i]}`)} /> :
                          <span className={styles.index}>{i + 1}</span>
                        }
                      </div>
                    }
                    extra={
                      <div className={styles.rank}>
                        {`${latestIntegral}分`}
                      </div>
                    }
                  >
                    <span>{userName}</span>
                  </List.Item>
                );
              })
              :
              <NoContent isLoading={loading} />
          }
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, rank }) => ({
  loading,
  rank,
}))(Rank);
