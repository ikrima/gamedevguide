import React from 'react';
import { Card } from 'antd';
import DEMO from 'constants/demoData';

const Box = () => {
  return(
    <div className="box box-transparent">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Card title="Card title" extra={<a href={DEMO.link}>More</a>} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  )
}

export default Box;