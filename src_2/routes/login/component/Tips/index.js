/**
 * @author Lowkey
 * @date 2021/04/25 10:36:23
 * @Description: 登录、注册标题
 */
import styles from './index.less'

export default (props) => (
  <div className={styles.container}>
    <p className={styles.title}>{props.title}</p>
    <p className={styles.sub}>{props.subTitle}</p>
  </div>
)
