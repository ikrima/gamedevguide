import React from 'react';
import { Avatar } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <div>
          <Avatar size="large" icon="user" />
          <Avatar icon="user" />
          <Avatar size="small" icon="user" />
        </div>
        <div>
          <Avatar shape="square" size="large" icon="user" />
          <Avatar shape="square" icon="user" />
          <Avatar shape="square" size="small" icon="user" />
        </div>
      </div>
    </div>
  )
}

export default Box;