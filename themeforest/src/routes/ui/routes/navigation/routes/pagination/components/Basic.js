import React from 'react';
import { Pagination } from 'antd'

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  )
}

export default Box;