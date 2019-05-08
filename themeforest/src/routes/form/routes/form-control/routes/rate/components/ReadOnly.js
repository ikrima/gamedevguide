import React from 'react';
import { Rate } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Read only</div>
      <div className="box-body">
        <Rate disabled defaultValue={2} />
      </div>
    </div>
  )
}

export default Box;