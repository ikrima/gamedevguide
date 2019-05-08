import React from 'react';
import QueueAnim from 'rc-queue-anim';
import IconStyles from './IconStyles';
import IconCard1 from './IconCard1';
import Centered from './Centered';
import Boxed from './Boxed';

const Page = () => (
  <section className="container-fluid container-mw-xl chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div className="article__section" key="1"> <IconStyles /> </div>
      <div className="article__section" key="2"> <IconCard1 /> </div>
      <div className="article__section" key="3"> <Centered /> </div>
      <div className="article__section" key="4"> <Boxed /> </div>
    </QueueAnim>
  </section>
);

export default Page;
