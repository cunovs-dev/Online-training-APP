import styles from './index.less';

export default (props: { children: object }) => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}
