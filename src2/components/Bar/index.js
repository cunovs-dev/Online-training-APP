import React from 'react';
import { Bar } from '@ant-design/charts';

const getData = (obj) => {
  const arr = [];
  if (obj) {
    arr.push(
      {
        value: obj.ag1,
        year: '明确职责目标'
      },
      {
        value: obj.ag2,
        year: '外部协调沟通'
      },
      {
        value: obj.ag3,
        year: '树立专业权威'
      },
      {
        value: obj.ag4,
        year: '建设执行到位'
      },
      {
        value: obj.bg1,
        year: '高效协同补位'
      },
      {
        value: obj.bg2,
        year: '深化客情关系'
      },
      {
        value: obj.bg3,
        year: '赢得良好口碑'
      },
      {
        value: obj.bg4,
        year: '科学高效运营'
      },
      {
        value: obj.cg1,
        year: '激发热情活力'
      },
      {
        value: obj.cg2,
        year: '实现合作共赢'
      },
      {
        value: obj.cg3,
        year: '保持引领地位'
      },
      {
        value: obj.cg4,
        year: '创新跨越发展'
      },
    );
  }
  return arr;
};

const DemoBar = (props) => {
  const { data } = props;

  var config = {
    data: getData(data),
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: false
  };
  return <Bar {...config} />;
};
export default DemoBar;
