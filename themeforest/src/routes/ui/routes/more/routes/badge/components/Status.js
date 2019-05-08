import React from 'react';
import { Badge } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Status</div>
      <div className="box-body">
        <Badge status="success" />
        <Badge status="error" />
        <Badge status="default" />
        <Badge status="processing" />
        <Badge status="warning" />
        <br />
        <Badge status="success" text="Success" />
        <br />
        <Badge status="error" text="Error" />
        <br />
        <Badge status="default" text="Default" />
        <br />
        <Badge status="processing" text="Processing" />
        <br />
        <Badge status="warning" text="Warning" />
      </div>
    </div>
  )
}

export default Box;