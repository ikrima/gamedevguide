import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Hero from './Hero';
import Timeline from './Timeline';
import CTA from './CTA';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Hero /> </div>
        <div key="2"> <Timeline /> </div>
        <div key="3"> <CTA /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
