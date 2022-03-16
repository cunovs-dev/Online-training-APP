import React, { useState, useEffect } from 'react';
import { Radar } from '@ant-design/charts';
import { DataSet } from '@antv/data-set';

const getData = (obj) => {
  const arr = [];
  if (obj) {
    arr.push(
      {
        a: obj.vae3,
        b: 3,
        item: '拓展影响力'
      },
      {
        a: obj.vae2,
        b: 3,
        item: '协调整合力'
      },
      {
        a: obj.vae1,
        b: 3,
        item: '督导激发力'
      },
      {
        a: obj.vae4,
        b: 3,
        item: '统筹策划力'
      }
    );
  }
  return arr;
};
const DemoRadar = (props) => {
  const { data } = props;
  const { DataView } = DataSet;
  const dv = new DataView().source(getData(data));
  dv.transform({
    type: 'fold',
    fields: ['a', 'b'],
    key: 'user',
    value: 'score' // value字段
  });
  const config = {
    data: dv.rows,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 5
      }
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null
          }
        }
      }
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null
          }
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)'
      }
    },
    legend: {
      itemValue: {
        formatter: (text, item, index) => {
         if(index===0){
           return '得分'
         }
         return '标准分'
        }
      }
    },
    // 开启辅助点
    point: {}
  };
  return <Radar {...config} />;
};
export default DemoRadar;
