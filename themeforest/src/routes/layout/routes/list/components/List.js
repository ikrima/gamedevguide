import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Section from './Section';
import Sizes from './Sizes';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section mb-4" key="1"> <Section /> </div>
        <div className="article__section mb-4" key="2"> <Sizes /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
