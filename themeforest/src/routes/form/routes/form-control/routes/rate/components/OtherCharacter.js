import React from 'react';
import { Rate, Icon } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Other Character</div>
      <div className="box-body">
        <Rate character={<Icon type="heart" />} allowHalf />
        <br />
        <Rate character="A" allowHalf style={{ fontSize: 36 }} />
      </div>
    </div>
  )
}

export default Box;