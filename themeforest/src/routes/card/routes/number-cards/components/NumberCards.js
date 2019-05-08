import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <Section1 /> </div>
        <div className="article__section" key="2"> <Section2 /> </div>
        <div className="article__section" key="3"> <Section3 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
