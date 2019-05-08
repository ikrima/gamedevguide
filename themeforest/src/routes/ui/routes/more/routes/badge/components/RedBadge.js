import React from 'react';
import { Badge, Icon } from 'antd';
import DEMO from 'constants/demoData';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Red badge</div>
      <div className="box-body">
        <Badge dot>
          <Icon type="notification" />
        </Badge>
        <Badge dot>
          <a href={DEMO.link}>Link something</a>
        </Badge>
      </div>
    </div>
  )
}

export default Box;