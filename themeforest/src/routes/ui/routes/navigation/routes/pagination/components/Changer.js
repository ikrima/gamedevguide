import React from 'react';
import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Changer</div>
      <div className="box-body">
        <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
      </div>
    </div>
  )
}

export default Box;