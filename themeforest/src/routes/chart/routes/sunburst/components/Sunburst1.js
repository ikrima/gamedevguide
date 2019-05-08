import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';

const sunburst1 = {};

let data = [{
  name: 'Grandpa',
  children: [{
    name: 'Uncle Leo',
    value: 15,
    children: [{
      name: 'Cousin Jack',
      value: 2
    }, {
      name: 'Cousin Mary',
      value: 5,
      children: [{
        name: 'Jackson',
        value: 2
      }]
    }, {
      name: 'Cousin Ben',
      value: 4
    }]
  }, {
    name: 'Father',
    value: 10,
    children: [{
      name: 'Me',
      value: 5
    }, {
      name: 'Brother Peter',
      value: 1
    }]
  }]
}, {
  name: 'Nancy',
  children: [{
    name: 'Uncle Nike',
    children: [{
      name: 'Cousin Betty',
      value: 1
    }, {
      name: 'Cousin Jenny',
      value: 2
    }]
  }]
}];

sunburst1.option = {
  series: {
    type: 'sunburst',
    // highlightPolicy: 'ancestor',
    data: data,
    radius: [0, '100%'],
    label: {
      rotate: 'radial'
    }
  }
};



const Chart = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Basic Sunburst</div>
    <div className="box-body">
      <ReactEcharts option={sunburst1.option} theme={"macarons"} style={{height: '600px'}} />
    </div>
  </div>
)

export default Chart;
