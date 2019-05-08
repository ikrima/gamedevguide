import React from 'react';
import { Progress } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Circular progress bar</div>
      <div className="box-body">
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
      </div>
    </div>
  )
}

export default Box;