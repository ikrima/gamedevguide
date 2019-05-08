import React from 'react';
import { Timeline } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Color</div>
      <div className="box-body">
        <Timeline>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  )
}

export default Box;