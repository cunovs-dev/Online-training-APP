import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import FilterModal from 'components/filterModal';
import Banner from 'components/banner/index';
import HotCourse from 'components/hotCourse/index';
import CarouselGrid from 'components/carouselgrid';
import InfoBox from 'components/infobox/index';
import Container from 'components/container/index';
import NoContent from 'components/nocontent';
import { handleGoto, handleBuildingClick } from 'utils/commonevents';
import Refresh from 'components/pulltorefresh';
import { List, Layout, WhiteSpace } from 'components';
import styles from '../dashboard/index.less';

const { BaseLine } = Layout;
let child;
const Comp = ({ location, dispatch, out }) => {
  const { bannerDatas, recommendData, infoDatas, carouseDatas } = out;
  const getChildren = (arr) => (
    arr && arr.map((data, i) => <InfoBox key={i} {...data} handleClick={handleBuildingClick.bind(null, dispatch)} />)
  );

  const onRef = (ref) => {
    child = ref;
  };
  return (
    <div>
      <Nav title="联盟单位" isGoBack={false} dispatch={dispatch} />

      {
        bannerDatas.length < 1 ?
          <NoContent />
          :
          <Refresh>
            <div className={styles.children}>
              <div>
                {bannerDatas.length > 0 &&
                <Banner bannerDatas={bannerDatas} handleClick={() => handleGoto(dispatch, 'lessondetails')} />}
              </div>
              <WhiteSpace size="md" />
              <CarouselGrid datas={carouseDatas} />
              <WhiteSpace size="md" />
              <HotCourse
                bannerDatas={recommendData}
                handleClick={handleBuildingClick.bind(null, dispatch)}
                moreClick={() => handleGoto(dispatch, 'videoList', { name: '猜你喜欢' })}
              />
              <WhiteSpace size="md"
              />
              <Container
                title="必修课程"
                children={getChildren(infoDatas)}
                moreClick={() => handleGoto(dispatch, 'videoList', { name: '必修课程' })}
              />
              <WhiteSpace size="md" />
              <BaseLine />
            </div>
          </Refresh>
      }
    </div>
  );
};

export default connect(({ loading, out }) => ({
  loading,
  out,
}))(Comp);
