import React from 'react';
import { Switch, Icon } from 'antd';

// Customized

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Text & icon</div>
      <div className="box-body">
        <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
        <br />
        <Switch checkedChildren="1" unCheckedChildren="0" />
        <br />
        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
      </div>
    </div>
  )
}

export default Box;