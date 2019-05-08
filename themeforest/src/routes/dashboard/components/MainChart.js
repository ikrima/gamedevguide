import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';

const COLOR = {
  success:    'rgba(139,195,74,.7)',
  info:       'rgba(1,188,212,.7)',
  text:       '#3D4051',
  gray:       '#EDF0F1'
}

let combo = {};

combo.option = {
  legend: {
    show: true,
    x: 'right',
    y: 'top',
    data: ['WOM', 'Viral', 'Paid']
  },
  grid: {
    x: 40,
    y: 60,
    x2: 40,
    y2: 30,
    borderWidth: 0
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: COLOR.gray
      }
    }
  },
  xAxis: [
    {
      type : 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#607685'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#f3f3f3'
        }
      },
      data : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  ],
  yAxis: [
    {
      type : 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#607685'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#f3f3f3'
        }
      }
    }
  ],
  series: [
    {
      name:'WOM',
      type:'bar',
      clickable: false,
      itemStyle: {
        normal: {
          color: COLOR.gray
        },
        emphasis: {
          color: 'rgba(237,240,241,.7)'
        }
      },
      barCategoryGap: '50%',
      data:[75,62,45,60,73,50,31,56,70,63,49,72,76,67,46,51,69,59,85,67,56],
      legendHoverLink: false,
      z: 2
    },
    {
      name:'Viral',
      type:'line',
      animation: false,
      smooth:true,
      itemStyle: {
        normal: {
          color: COLOR.success,
          areaStyle: {
            color: COLOR.success,
            type: 'default'
          }
        }
      },
      data:[0,0,0,5,20,15,30,28,25,40,60,40,43,32,36,23,12,15,2,0,0],
      symbol: 'none',
      legendHoverLink: false,
      z: 3
    },
    {
      name:'Paid',
      type:'line',
      animation: false,
      smooth:true,
      itemStyle: {
        normal: {
          color: COLOR.info,
          areaStyle: {
            color: COLOR.info,
            type: 'default'
          }
        }
      },
      data:[0,0,0,0,1,6,15,8,16,9,25,12,50,20,25,12,2,1,0,0,0],
      symbol: 'none',
      legendHoverLink: false,
      z: 4
    }
  ]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-body">
      <ReactEcharts option={combo.option} theme={"macarons"} style={{height: '450px'}} />
    </div>
  </div>
);

export default Chart;
