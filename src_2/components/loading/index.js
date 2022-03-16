import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';


function Css3Loading (props) {
  return (
    <div style={{ display: props.show ? 'block' : 'none' }} >
      <Icon type={getLocalIcon('/others/cssloading.svg')} />
    </div>

  );
}

function LoadingFail (props) {
  return (
    <div><Icon type={getLocalIcon('/others/loadingfail.svg')} /></div>
  );
}

Css3Loading.defaultProps = {
  show: true,
};

module.exports = {
  Css3Loading,
  LoadingFail,
};
