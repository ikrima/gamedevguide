import React from 'react';
import { Badge } from 'antd';

// Customized to fix warning

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Badge count={5}>
          <span className="head-example"></span>
        </Badge>
        <Badge count={0} showZero>
          <span className="head-example"></span>
        </Badge>
      </div>
    </div>
  )
}

export default Box;