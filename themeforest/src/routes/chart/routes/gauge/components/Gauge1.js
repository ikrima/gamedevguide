import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let gauge1 = {};

gauge1.option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  series: [
    {
      name: 'Business metric',
      type: 'gauge',
      detail: {formatter: '{value}%'},
      data: [{value: 50, name: 'Completion'}],
      title: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      }
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Gauge</div>
    <div className="box-body">
      <ReactEcharts option={gauge1.option} theme={"macarons"} />
    </div>
  </div>
)

export default Chart;