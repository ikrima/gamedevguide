import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Hero from './Hero';
import Positions from './Positions';
import WhyWorkingHere from './WhyWorkingHere';


const Page = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><WhyWorkingHere /></div>
      <div key="3"><Positions /></div>
    </QueueAnim>
  </section>
);

export default Page;
