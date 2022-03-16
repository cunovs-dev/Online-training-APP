/**
 * @author Lowkey
 * @date 2021/04/27 11:35:02
 * @Description: css3动画
 */
import styles from './index.less';

export const Wave = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.rectangle1} />
      <div className={styles.rectangle2} />
      <div className={styles.rectangle3} />
      <div className={styles.rectangle4} />
      <div className={styles.rectangle5} />
      <div className={styles.rectangle6} />
      <div className={styles.rectangle5} />
      <div className={styles.rectangle4} />
      <div className={styles.rectangle3}/>
      <div className={styles.rectangle2}/>
      <div className={styles.rectangle1} />
    </div>
  );
};
