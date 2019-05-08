import React from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Mini version</div>
      <div className="box-body">
        <Steps size="small" current={1}>
          <Step title="Finished" />
          <Step title="In Progress" />
          <Step title="Waiting" />
        </Steps>
      </div>
    </div>
  )
}

export default Box;