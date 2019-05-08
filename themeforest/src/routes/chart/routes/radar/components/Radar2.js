import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let radar2 = {};

radar2.option = {
  tooltip: {},
  legend: {
    x: 'center',
    data: ['Ronaldo', 'Andriy Shevchenko'],
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
        {name: 'Attack', max: 100},
        {name: 'Guard', max: 100},
        {name: 'Physical', max: 100},
        {name: 'Speed', max: 100},
        {name: 'Strength', max: 100},
        {name: 'Skill', max: 100}
      ],
      radius: 130
    }
  ],
  series: [
    {
      name: 'Full of live data',
      type: 'radar',
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default'
          }
        }
      },
      data: [
        {
          value: [97, 42, 88, 94, 90, 86],
          name: 'Andriy Shevchenko'
        },
        {
          value: [97, 32, 74, 95, 88, 92],
          name: 'Ronaldo'
        }
      ]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Filled Radar</div>
    <div className="box-body">
      <ReactEcharts option={radar2.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;