import React from 'react';
import { Progress } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Mini size progress bar</div>
      <div className="box-body">
        <div style={{ width: 170 }}>
          <Progress percent={30} strokeWidth={5} />
          <Progress percent={50} strokeWidth={5} status="active" />
          <Progress percent={70} strokeWidth={5} status="exception" />
          <Progress percent={100} strokeWidth={5} />
        </div>
      </div>
    </div>
  )
}

export default Box;