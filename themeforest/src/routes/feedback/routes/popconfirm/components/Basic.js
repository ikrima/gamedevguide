import React from 'react';
import { Popconfirm, message } from 'antd';
import DEMO from 'constants/demoData';

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
          <a href={DEMO.link}>Delete</a>
        </Popconfirm>
      </div>
    </div>
  )
}

export default Box;