import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let line1 = {};

line1.option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Highest temperature', 'Lowest temperature'],
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
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      axisLabel: {
        formatter: '{value} °C',
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C',
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Highest temperature',
      type: 'line',
      data: [11, 11, 15, 13, 12, 13, 10],
      markPoint: {
        data: [
          {type: 'max', name: 'Max'},
          {type: 'min', name: 'Min'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: 'Average'}
        ]
      }
    },
    {
      name: 'Lowest temperature',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [
                    {name: 'Lowest temperature', value: -2, xAxis: 1, yAxis: -1.5}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: 'Average'}
        ]
      }
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Line</div>
    <div className="box-body">
      <ReactEcharts option={line1.option} theme={"macarons"} />
    </div>
  </div>
)

export default Chart;