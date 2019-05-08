import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let bar3 = {};

bar3.option = {
  title: {
    text: 'World Population',
    subtext: 'From the Internet'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['2011', '2012'],
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
      boundaryGap: [0, 0.01],
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
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World Population (10k)'],
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
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
};

const Bar3 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Bar</div>
    <div className="box-body">
      <ReactEcharts option={bar3.option} theme={"macarons"} />
    </div>
  </div>
)

export default Bar3;
