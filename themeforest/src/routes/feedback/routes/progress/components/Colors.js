import React from 'react';
import { Progress } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Custom Colors</div>
      <div className="box-body">
        <Progress percent={30} className="ant-progress-type-success" />
        <Progress percent={50} className="ant-progress-type-info" />
        <Progress percent={70} className="ant-progress-type-warning" />
        <Progress percent={60} className="ant-progress-type-danger" />
        <Progress percent={50} className="ant-progress-type-primary" />
        <Progress percent={55} className="ant-progress-type-secondary" />
      </div>
    </div>
  )
}

export default Box;