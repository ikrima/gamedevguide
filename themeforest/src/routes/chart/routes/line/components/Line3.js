import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let line3 = {};

line3.option = {
  title: {
    text: 'Sales',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Intention', 'Pre-order', 'Deal closed'],
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
      name: 'Deal closed',
      type: 'line',
      smooth: true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [10, 12, 21, 54, 260, 830, 710]
    },
    {
      name: 'Pre-order',
      type: 'line',
      smooth: true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [30, 182, 434, 791, 390, 30, 10]
    },
    {
      name: 'Intention',
      type: 'line',
      smooth: true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [1320, 1132, 601, 234, 120, 90, 20]
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Area</div>
    <div className="box-body">
      <ReactEcharts option={line3.option} theme={"macarons"} />
    </div>
  </div>
)

export default Chart;