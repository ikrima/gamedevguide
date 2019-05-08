import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CustomizedValidation from './CustomizedValidation';
import DynamicRules from './DynamicRules';


const Page = () => {
  return(
    <div className="container-fluid container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <CustomizedValidation /> </div>
        <div className="article__section" key="2"> <DynamicRules /> </div>
      </QueueAnim>
    </div>
  )
}

export default Page;