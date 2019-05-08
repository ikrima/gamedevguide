import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Style1 from './Style1';
import Style2 from './Style2';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <Style1 /> </div>
        <div key="2" className="mb-3"> <Style2 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
