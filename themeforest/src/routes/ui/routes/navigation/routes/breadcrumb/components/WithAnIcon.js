import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import DEMO from 'constants/demoData';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">With an Icon</div>
      <div className="box-body">
        <Breadcrumb>
          <Breadcrumb.Item href={DEMO.link}>
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href={DEMO.link}>
            <Icon type="user" />
            <span>Application List</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Application
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default Box;