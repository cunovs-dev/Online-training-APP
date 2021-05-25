import { Grid } from 'components';
import styles from './index.less';

const PrefixCls = 'carouselgrid';
const CarouselGrid = (props) => {
  console.log(props.data)
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
              fetchType:props.data,
              ...data,
            };
            props.handlerClick(params,props.dispatch);
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
