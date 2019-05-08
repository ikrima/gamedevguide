import React from 'react';
import { Tooltip } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Tooltip title="prompt text">
          <span>Tooltip will show when mouse enter.</span>
        </Tooltip>
      </div>
    </div>
  )
}

export default Box;