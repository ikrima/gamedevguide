import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon1 = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const antIcon2 = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;
const antIcon3 = <Icon type="sync" style={{ fontSize: 24 }} spin />;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Custom spinning indicator</div>
      <div className="box-body">
        <Spin indicator={antIcon1} />
        <span className="mx-3"></span>
        <Spin indicator={antIcon2} />
        <span className="mx-3"></span>
        <Spin indicator={antIcon3} />
      </div>
    </div>
  )
}

export default Box;