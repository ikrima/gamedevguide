import React from 'react';
import { Card } from 'antd';

const Box = () => {
  return(
    <div className="box box-transparent">
      <div className="box-header">No border</div>
      <div className="box-body">
        <Card title="Card title" bordered={false} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  )
}

export default Box;