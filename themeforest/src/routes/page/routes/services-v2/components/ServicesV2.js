import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Hero from './Hero';
import Services from './Services';
import CTA from './CTA';


const Page = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Services /></div>
      <div key="3"><CTA /></div>
    </QueueAnim>
  </section>
);

export default Page;

