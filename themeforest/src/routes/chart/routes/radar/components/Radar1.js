import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let radar1 = {};

radar1.option = {
  title: {
    text: 'Budget vs spending'
  },
  tooltip: {},
  legend: {
    orient: 'vertical',
    x: 'right',
    y: 'bottom',
    data: ['Allocated Budget', 'Actual Spending'],
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
  radar: [
    {
      axisLine: {
        show: true,
        lineStyle: {
                    // for both indicator and axisLine, bad, better seperate them
          color: '#b1b1b1'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,.1)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      },
      indicator: [
        { name: 'Sales', max: 6000},
        { name: 'Administration', max: 16000},
        { name: 'Information Techology', max: 30000},
        { name: 'Customer Support', max: 38000},
        { name: 'Development', max: 52000},
        { name: 'Marketing', max: 25000}
      ]
    }
  ],
  calculable: true,
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Radar</div>
    <div className="box-body">
      <ReactEcharts option={radar1.option} theme={"macarons"} />
    </div>
  </div>
)

export default Chart;