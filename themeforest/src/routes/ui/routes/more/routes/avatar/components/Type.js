import React from 'react';
import { Avatar } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Types</div>
      <div className="box-body">
        <Avatar icon="user" />
        <Avatar>U</Avatar>
        <Avatar>USER</Avatar>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
      </div>
    </div>
  )
}

export default Box;