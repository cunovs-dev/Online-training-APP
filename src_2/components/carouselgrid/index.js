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
        data={props.data}
        columnNum={4}
        dots={false}
        hasLine={false}
        isCarousel
        carouselMaxRow={1}
        onClick={
          (data) => {
            const params = {
              fetchType: 'cj',
              ...data,
            };
            props.handlerClick(params, props.dispatch);
          }
        }
      />
    </div>
  );
};

CarouselGrid.defaultProps = {
  data: [],
  handlerClick: null,
};
export default CarouselGrid;
