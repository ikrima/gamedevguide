import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let scatter2 = {};

function random() {
  const r = Math.round(Math.random() * 100);
  return (r * (r % 2 === 0 ? 1 : -1));
}
function randomDataArray() {
  const d = [];
  let len = 100;
  while (len--) {
    d.push([
      random(),
      random(),
      Math.abs(random()),
    ]);
  }
  return d;
}
scatter2.option = {
  tooltip: {
    trigger: 'axis',
    showDelay: 0,
    axisPointer: {
      show: true,
      type: 'cross',
      lineStyle: {
        type: 'dashed',
        width: 1
      }
    }
  },
  legend: {
    data: ['A', 'B'],
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
  xAxis: [
    {
      type: 'value',
      splitNumber: 4,
      scale: true,
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
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitNumber: 4,
      scale: true,
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
      name: 'A',
      type: 'scatter',
      symbolSize(value) {
        return Math.round(value[2] / 5);
      },
      data: randomDataArray()
    },
    {
      name: 'B',
      type: 'scatter',
      symbolSize(value) {
        return Math.round(value[2] / 5);
      },
      data: randomDataArray()
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Bubble</div>
    <div className="box-body">
      <ReactEcharts option={scatter2.option} theme={"macarons"} style={{height: '400px'}} />
    </div>
  </div>
)

export default Chart;