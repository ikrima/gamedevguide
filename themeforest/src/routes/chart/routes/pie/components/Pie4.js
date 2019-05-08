import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let pie4 = {};

pie4.option = {
  title: {
    text: 'Nightingale rose diagram',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
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
      name: 'Radius model',
      type: 'pie',
      radius: [20, 110],
      center: ['25%', 200],
      roseType: 'radius',
      width: '40%',       // for funnel
      max: 40,            // for funnel
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
            show: true
          },
          labelLine: {
            show: true
          }
        }
      },
      data: [
        {value: 10, name: 'rose1'},
        {value: 5, name: 'rose2'},
        {value: 15, name: 'rose3'},
        {value: 25, name: 'rose4'},
        {value: 20, name: 'rose5'},
        {value: 35, name: 'rose6'},
        {value: 30, name: 'rose7'},
        {value: 40, name: 'rose8'}
      ]
    },
    {
      name: 'Area model',
      type: 'pie',
      radius: [30, 110],
      center: ['75%', 200],
      roseType: 'area',
      x: '50%',               // for funnel
      max: 40,                // for funnel
      sort: 'ascending',     // for funnel
      data: [
        {value: 10, name: 'rose1'},
        {value: 5, name: 'rose2'},
        {value: 15, name: 'rose3'},
        {value: 25, name: 'rose4'},
        {value: 20, name: 'rose5'},
        {value: 35, name: 'rose6'},
        {value: 30, name: 'rose7'},
        {value: 40, name: 'rose8'}
      ]
    }
  ]

};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Nightingale's Rose Diagram</div>
    <div className="box-body">
      <ReactEcharts option={pie4.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;