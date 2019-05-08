import React from 'react';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Custom Panel</div>
      <div className="box-body">
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default Box;