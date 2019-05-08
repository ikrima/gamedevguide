import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CTA1 from './CTA1';
import Boxed from './Boxed';
import CTA2 from './CTA2';



const Page = () => (
  <section className="chapter">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><CTA1 /></div>
      <div key="2"><Boxed /></div>
      <div key="3"><CTA2 /></div>
    </QueueAnim>

  </section>
);

export default Page;
