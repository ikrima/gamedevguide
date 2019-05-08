import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';

let candlestick1 = {};

candlestick1.option = {
  xAxis: {
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
  },
  yAxis: {},
  series: [{
    type: 'k',
    data: [
      [20, 30, 10, 35],
      [40, 35, 30, 55],
      [33, 38, 33, 40],
      [40, 40, 32, 42]
    ]
  }]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Candlestick</div>
    <div className="box-body">
      <ReactEcharts option={candlestick1.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;