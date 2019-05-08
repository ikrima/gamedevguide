import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Hero from './Hero';
import ContactForm from './ContactForm';



const Page = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div className="article__section" key="1"><Hero /></div>
      <div className="article__section" key="2"><ContactForm /></div>
    </QueueAnim>
  </section>
);

export default Page;
