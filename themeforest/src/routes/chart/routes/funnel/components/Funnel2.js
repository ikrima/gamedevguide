import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let funnel2 = {};

funnel2.option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  legend: {
    data: ['Display', 'Click', 'Visit', 'Question', 'Order'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  series: [
    {
      name: 'Forecast',
      type: 'funnel',
      left: '10%',
      width: '80%',
      label: {
        normal: {
          formatter: '{b} Forecast'
        },
        emphasis: {
          position: 'inside',
          formatter: '{b} Forecast: {c}%'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          opacity: 0.7
        }
      },
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Display'}
      ]
    },
    {
      name: 'Reality',
      type: 'funnel',
      left: '10%',
      width: '80%',
      maxSize: '80%',
      label: {
        normal: {
          position: 'inside',
          formatter: '{c}%',
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          position: 'inside',
          formatter: '{b} Reality: {c}%'
        }
      },
      itemStyle: {
        normal: {
          opacity: 0.5,
          borderColor: '#fff',
          borderWidth: 2
        }
      },
      data: [
        {value: 30, name: 'Visit'},
        {value: 10, name: 'Ask'},
        {value: 5, name: 'Order'},
        {value: 50, name: 'Click'},
        {value: 80, name: 'Display'}
      ]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Customized Funnel</div>
    <div className="box-body">
      <ReactEcharts option={funnel2.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;