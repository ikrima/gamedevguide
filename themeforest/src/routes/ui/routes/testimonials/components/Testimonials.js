import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Testimonials1 from './Testimonials1';
import Testimonials2 from './Testimonials2';
import Testimonials3 from './Testimonials3';
import Testimonials4 from './Testimonials4';

const Page = () => (
  <section className="container-fluid container-mw-xxl chapter" >
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Testimonials1 /></div>
      <div key="2"><Testimonials2 /></div>
      <div key="3"><Testimonials3 /></div>
      <div key="4"><Testimonials4 /></div>
    </QueueAnim>
  </section>
);

export default Page;
