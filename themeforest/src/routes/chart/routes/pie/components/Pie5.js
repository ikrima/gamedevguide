import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let pie5 = {};

pie5.option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    show: false,
    orient: 'vertical',
    x: 'left',
    data: ['Direct', 'Ads', 'Search', 'Email Marketing', 'Affiliates', 'Video Ads', 'Google', 'Bing', 'Others'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  series: [
    {
      name: 'Traffic Source',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],

      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {value: 355, name: 'Direct', selected: true},
        {value: 679, name: 'Ads'},
        {value: 1401, name: 'Search'}
      ]
    },
    {
      name: 'Traffic Source',
      type: 'pie',
      radius: ['40%', '55%'],
      data: [
        {value: 355, name: 'Direct'},
        {value: 310, name: 'Email Marketing'},
        {value: 234, name: 'Affiliates'},
        {value: 135, name: 'Video Ads'},
        {value: 1048, name: 'Google'},
        {value: 251, name: 'Bing'},
        {value: 102, name: 'Others'}
      ]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Nested Pies</div>
    <div className="box-body">
      <ReactEcharts option={pie5.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;