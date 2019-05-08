import React from 'react';
import QueueAnim from 'rc-queue-anim';
import PricingTables1 from './PricingTables1';


const Page = () => {
  return (
    <div className="container-fluid no-breadcrumb container-mw-xxl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <PricingTables1 /> </div>
      </QueueAnim>
    </div>
  )
}

export default Page;
