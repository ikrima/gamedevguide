import React from 'react';
import { Tooltip, Button } from 'antd';

const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Arrow pointing at the center</div>
      <div className="box-body">
        <Tooltip placement="topLeft" title="Prompt Text">
          <Button>Align edge</Button>
        </Tooltip>
        <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
          <Button>Arrow points to center</Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default Box;