import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let pie2 = {};

pie2.option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  calculable: true,
  series: [
    {
      name: 'Traffic source',
      type: 'pie',
      radius: ['50%', '70%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      },
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Affiliate'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search'}
      ]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Doughnut</div>
    <div className="box-body">
      <ReactEcharts option={pie2.option} theme={"macarons"} />
    </div>
  </div>
)

export default Chart;