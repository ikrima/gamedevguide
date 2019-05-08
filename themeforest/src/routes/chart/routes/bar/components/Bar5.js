import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let bar5 = {};

bar5.option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Profit', 'Cost', 'Income'],
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
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {show: false},
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
      name: 'Profit',
      type: 'bar',
      itemStyle: { normal: {label: {show: true, position: 'inside'}}},
      data: [200, 170, 240, 244, 200, 220, 210]
    },
    {
      name: 'Income',
      type: 'bar',
      stack: 'Sum',
      barWidth: 5,
      itemStyle: {normal: {
        label: {show: true}
      }},
      data: [320, 302, 341, 374, 390, 450, 420]
    },
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Sum',
      itemStyle: {normal: {
        label: {show: true, position: 'left'}
      }},
      data: [-120, -132, -101, -134, -190, -230, -210]
    }
  ]
};

const Bar5 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Tornado</div>
    <div className="box-body">
      <ReactEcharts option={bar5.option} theme={"macarons"} />
    </div>
  </div>
);

export default Bar5;
