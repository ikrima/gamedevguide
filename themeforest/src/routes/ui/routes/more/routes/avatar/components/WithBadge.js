import React from 'react';
import { Avatar, Badge } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">With Badge</div>
      <div className="box-body">
        <span style={{ marginRight: 24 }}>
          <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
        </span>
        <span>
          <Badge dot><Avatar shape="square" icon="user" /></Badge>
        </span>
      </div>
    </div>
  )
}

export default Box;