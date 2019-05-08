import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let funnel1 = {};

funnel1.option = {
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
      x: '10%',
      y: 60,
            // x2: 80,
      y2: 60,
      width: '80%',
            // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending', // 'ascending', 'descending'
      gap: 10,
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            show: false,
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            formatter: '{b}:{c}%'
          },
          labelLine: {
            show: true
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
    <div className="box-header">Basic Funnel</div>
    <div className="box-body">
      <ReactEcharts option={funnel1.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;