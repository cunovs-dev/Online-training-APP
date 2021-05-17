import { Grid } from 'components';
import styles from './index.less';

const PrefixCls = 'carouselgrid';
const CarouselGrid = (props) => {
  return (
    <div className={styles[`${PrefixCls}`]}>
      <Grid
        itemStyle={{
          color: '#ddd',
        }}
        data={props.datas}
        columnNum={4}
        dots={false}
        hasLine={false}
        isCarousel
        carouselMaxRow={1}
        onClick={_el => console.log(_el)}
      />
    </div>
  );
};

CarouselGrid.defaultProps = {
  datas: [],
};
CarouselGrid.propTypes = {};
export default CarouselGrid;
