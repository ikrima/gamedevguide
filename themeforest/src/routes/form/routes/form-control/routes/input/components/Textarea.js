import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Textarea</div>
      <div className="box-body">
        <TextArea rows={4} />
      </div>
    </div>
  )
}

export default Box;