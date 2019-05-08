import React from 'react';
import { Progress } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Mini size circular progress bar</div>
      <div className="box-body">
        <Progress type="circle" percent={30} width={80} />
        <Progress type="circle" percent={70} width={80} status="exception" />
        <Progress type="circle" percent={100} width={80} />
      </div>
    </div>
  )
}

export default Box;