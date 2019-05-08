import React from 'react';
import { Breadcrumb } from 'antd';
import DEMO from 'constants/demoData';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Configuring the Separator</div>
      <div className="box-body">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item href={DEMO.link}>Application Center</Breadcrumb.Item>
          <Breadcrumb.Item href={DEMO.link}>Application List</Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default Box;