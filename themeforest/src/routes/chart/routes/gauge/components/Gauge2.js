import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';

let gauge2 = {};

gauge2.option = {
  "toolbox": {
    "show": false,
    "feature": {
      "mark": {
        "show": true
      },
      "restore": {
        "show": true
      },
      "saveAsImage": {
        "show": true
      }
    }
  },
  "series": [{
    "name": "KPI",
    "type": "gauge",
    "startAngle": 180,
    "endAngle": 0,
    "center": ["50%", "77%"],
    "radius": 300,
    "axisLine": {
      "lineStyle": {
        "width": 50,
        "color": [[0.298, "#2d99e2"], [1, "#dce3ec"]]
      }
    },
    "axisTick": {
      "show": false
    },
    "axisLabel": {
      "show": false
    },
    "splitLine": {
      "show": false
    },
    "pointer": {
      "width": 20,
      "length": "80%",
      "color": "#2d99e2"
    },
    "title": {
      "show": true,
      "offsetCenter": [25, "25%"],
      "textStyle": {
        "color": "#2d99e2",
        "fontSize": 15,
        "fontWeight": "bold"
      }
    },
    "detail": {
      "show": false
    },
    "data": [{
      "value": 29.8,
      "name": "29.8%"
    }]
  }]
};

const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Gauge</div>
    <div className="box-body">
      <ReactEcharts option={gauge2.option} theme={"macarons"} style={{height: '450px'}} />
    </div>
  </div>
)

export default Chart;