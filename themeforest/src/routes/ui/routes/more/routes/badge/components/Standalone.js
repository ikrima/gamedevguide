import React from 'react';
import { Badge } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Standalone</div>
      <div className="box-body">
        <Badge count={25} />
        <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
        <Badge count={109} style={{ backgroundColor: '#87d068' }} />
      </div>
    </div>
  )
}

export default Box;