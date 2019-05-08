import React from 'react';
import { Steps, Icon } from 'antd';
const Step = Steps.Step;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">With icon</div>
      <div className="box-body">
        <Steps>
          <Step status="finish" title="Login" icon={<Icon type="user" />} />
          <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
          <Step status="process" title="Pay" icon={<Icon type="credit-card" />} />
          <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
      </div>
    </div>
  )
}

export default Box;