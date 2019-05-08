import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let bar1 = {};

bar1.option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Evaporation', 'Precipitation'],
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
      data: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
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
      name: 'Evaporation',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
      name: 'Precipitation',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      markPoint: {
        data: [
          {name: 'Highest', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18},
          {name: 'Lowest', value: 2.3, xAxis: 11, yAxis: 3}
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

const Bar1 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Column</div>
    <div className="box-body">
      <ReactEcharts option={bar1.option} theme={"macarons"} />
    </div>
  </div>
)

export default Bar1;