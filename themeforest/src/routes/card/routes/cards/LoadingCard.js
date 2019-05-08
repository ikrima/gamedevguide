import React from 'react';
import { Card } from 'antd';

const Box = () => {
  return(
    <div className="box box-transparent">
      <div className="box-header">Loading card</div>
      <div className="box-body">
        <Card loading title="Card title" style={{ width: '300px' }}>
          Whatever content
        </Card>
      </div>
    </div>
  )
}

export default Box;