import React from 'react';
import { Pagination } from 'antd';

function showTotal(total) {
  return `Total ${total} items`;
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Mini size</div>
      <div className="box-body">
        <Pagination size="small" total={50} />
        <br />
        <Pagination size="small" total={50} showSizeChanger showQuickJumper />
        <br />
        <Pagination size="small" total={50} showTotal={showTotal} />
      </div>
    </div>
  )
}

export default Box;