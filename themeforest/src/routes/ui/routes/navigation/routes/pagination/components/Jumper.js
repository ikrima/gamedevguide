import React from 'react';
import { Pagination } from 'antd';

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Jumper</div>
      <div className="box-body">
        <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
      </div>
    </div>
  )
}

export default Box;