import React from 'react';
import DEMO from 'constants/demoData';
import { Tooltip } from 'antd';
const text = <span>prompt text</span>;

const Box = () => {
  return(
    <div className="box box-default demo-style-tooltip">
      <div className="box-header">Placement</div>
      <div className="box-body">
        <div style={{ marginLeft: 60 }}>
          <Tooltip placement="topLeft" title={text}>
            <a href={DEMO.link}>TL</a>
          </Tooltip>
          <Tooltip placement="top" title={text}>
            <a href={DEMO.link}>Top</a>
          </Tooltip>
          <Tooltip placement="topRight" title={text}>
            <a href={DEMO.link}>TR</a>
          </Tooltip>
        </div>
        <div style={{ width: 60, float: 'left' }}>
          <Tooltip placement="leftTop" title={text}>
            <a href={DEMO.link}>LT</a>
          </Tooltip>
          <Tooltip placement="left" title={text}>
            <a href={DEMO.link}>Left</a>
          </Tooltip>
          <Tooltip placement="leftBottom" title={text}>
            <a href={DEMO.link}>LB</a>
          </Tooltip>
        </div>
        <div style={{ width: 60, marginLeft: 270 }}>
          <Tooltip placement="rightTop" title={text}>
            <a href={DEMO.link}>RT</a>
          </Tooltip>
          <Tooltip placement="right" title={text}>
            <a href={DEMO.link}>Right</a>
          </Tooltip>
          <Tooltip placement="rightBottom" title={text}>
            <a href={DEMO.link}>RB</a>
          </Tooltip>
        </div>
        <div style={{ marginLeft: 60, clear: 'both' }}>
          <Tooltip placement="bottomLeft" title={text}>
            <a href={DEMO.link}>BL</a>
          </Tooltip>
          <Tooltip placement="bottom" title={text}>
            <a href={DEMO.link}>Bottom</a>
          </Tooltip>
          <Tooltip placement="bottomRight" title={text}>
            <a href={DEMO.link}>BR</a>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Box;