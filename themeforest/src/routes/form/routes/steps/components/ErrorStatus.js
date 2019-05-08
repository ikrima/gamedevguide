import React from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Error status</div>
      <div className="box-body">
        <Steps current={1} status="error">
          <Step title="Finished" description="This is a description" />
          <Step title="In Process" description="This is a description" />
          <Step title="Waiting" description="This is a description" />
        </Steps>
      </div>
    </div>
  )
}

export default Box;