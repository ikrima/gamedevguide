import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Autosizing the height to fit the content</div>
      <div className="box-body">
        <TextArea placeholder="Autosize height based on content lines" autosize />
        <div style={{ margin: '24px 0' }} />
        <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
      </div>
    </div>
  )
}

export default Box;