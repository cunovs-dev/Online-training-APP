/**
 * @author Lowkey
 * @date 2018/10/25
 * @Description: 课程列表
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { List, Accordion } from 'components';
import { chapterRow } from 'components/row';

const PrefixCls = 'courselist';

const CourseList = (props) => (
  <div className={styles[`${PrefixCls}-outer`]}>
    <Accordion defaultActiveKey="0" className={styles[`${PrefixCls}-accordion`]}>
      {
        props.data.map((d, i) => {
          return <Accordion.Panel header={d.section}>
            {d.part && d.part.map((p, i) => (
              chapterRow(p, i, props.handlerClick.bind(this, p))
            ))}
          </Accordion.Panel>;
        })
      }
    </Accordion>
  </div>
);

CourseList.propTypes = {
  data: PropTypes.array.isRequired,
  handlerClick: PropTypes.func.isRequired,
};

CourseList.defaultProps = {};
export default CourseList;
