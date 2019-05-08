import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let funnel3 = {};

funnel3.option = {
  title: {
    text: 'Funnel',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  legend: {
    data: ['Dispaly', 'Click', 'Visit', 'Question', 'Order'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  calculable: true,
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Dispaly'}
      ]
    },
    {
      name: 'Pyramid',
      type: 'funnel',
      x: '50%',
      sort: 'ascending',
      itemStyle: {
        normal: {
          label: {
            position: 'left'
          }
        }
      },
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Dispaly'}
      ]
    }
  ]
};


const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Multiple Funnels</div>
    <div className="box-body">
      <ReactEcharts option={funnel3.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;