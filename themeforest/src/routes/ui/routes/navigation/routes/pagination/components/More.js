import React from 'react';
import { Pagination } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">More</div>
      <div className="box-body">
        <Pagination defaultCurrent={6} total={500} />
      </div>
    </div>
  )
}

export default Box;