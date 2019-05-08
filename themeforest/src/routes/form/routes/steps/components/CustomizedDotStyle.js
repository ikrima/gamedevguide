import React from 'react';
import { Steps, Popover } from 'antd';
const Step = Steps.Step;

const customDot = (dot, { status, index }) => (
  <Popover content={<span>step {index} status: {status}</span>}>
    {dot}
  </Popover>
);

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customized Dot Style</div>
      <div className="box-body">
        <Steps current={1} progressDot={customDot}>
          <Step title="Finished" description="You can hover on the dot." />
          <Step title="In Progress" description="You can hover on the dot." />
          <Step title="Waiting" description="You can hover on the dot." />
          <Step title="Waiting" description="You can hover on the dot." />
        </Steps>
      </div>
    </div>
  )
}

export default Box;