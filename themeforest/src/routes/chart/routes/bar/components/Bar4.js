import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import CHARTCONFIG from 'constants/chartConfig';

let bar4 = {};

bar4.option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search'],
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
      name: 'Direct',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
};

const Bar4 = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Stacked Bar</div>
    <div className="box-body">
      <ReactEcharts option={bar4.option} theme={"macarons"} />
    </div>
  </div>
)

export default Bar4;