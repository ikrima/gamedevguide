import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let bar2 = {};

bar2.option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search', 'Baidu', 'Google', 'Bing', 'Others'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
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
      name: 'Direct',
      type: 'bar',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ads',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate',
      type: 'bar',
      stack: 'Ads',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Ads',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      markLine: {
        itemStyle: {
          normal: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        data: [
                    [{type: 'min'}, {type: 'max'}]
        ]
      }
    },
    {
      name: 'Baidu',
      type: 'bar',
      barWidth: 5,
      stack: 'Search',
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: 'Google',
      type: 'bar',
      stack: 'Search',
      data: [120, 132, 101, 134, 290, 230, 220]
    },
    {
      name: 'Bing',
      type: 'bar',
      stack: 'Search',
      data: [60, 72, 71, 74, 190, 130, 110]
    },
    {
      name: 'Others',
      type: 'bar',
      stack: 'Search',
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
};

const Bar2 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Stacked Column</div>
    <div className="box-body">
      <ReactEcharts option={bar2.option} theme={"macarons"} />
    </div>
  </div>
)

export default Bar2;