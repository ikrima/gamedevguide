import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let radar3 = {};

radar3.option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    x: 'center',
    data: ['Software', 'Galaxy Phone', 'iPhone', 'Precipitation', 'Evaporation'],
    textStyle: {
      color: CHARTCONFIG.color.text
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
                    {text: 'Brand', max: 100},
                    {text: 'Content', max: 100},
                    {text: 'Usability', max: 100},
                    {text: 'Features', max: 100}
      ],
      center: ['25%', '40%'],
      radius: 80
    },
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
        {text: 'Look', max: 100},
        {text: 'Camera', max: 100},
        {text: 'System', max: 100},
        {text: 'Performance', max: 100},
        {text: 'Display', max: 100}
      ],
      radius: 80,
      center: ['50%', '60%'],
    },
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
      indicator: (function () {
        const res = [];
        for (let i = 1; i <= 12; i++) {
          res.push({text: `Mon. ${i}`, max: 100});
        }
        return res;
      }()),
      center: ['75%', '40%'],
      radius: 80
    }
  ],
  series: [
    {
      type: 'radar',
      tooltip: {
        trigger: 'item'
      },
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [
        {
          value: [60, 73, 85, 40],
          name: 'Software'
        }
      ]
    },
    {
      type: 'radar',
      radarIndex: 1,
      data: [
        {
          value: [85, 90, 90, 95, 95],
          name: 'Galaxy Phone'
        },
        {
          value: [95, 80, 95, 90, 93],
          name: 'iPhone'
        }
      ]
    },
    {
      type: 'radar',
      radarIndex: 2,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [
        {
          name: 'Precipitation',
          value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: 'Evaporation',
          value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
        }
      ]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Multiple Radar</div>
    <div className="box-body">
      <ReactEcharts option={radar3.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;