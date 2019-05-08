import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Notation from './Notation';
import Examples from './Examples';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Notation /> </div>
        <div key="2"> <Examples /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
