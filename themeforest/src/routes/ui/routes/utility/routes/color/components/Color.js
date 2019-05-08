import React from 'react';
import QueueAnim from 'rc-queue-anim';
import BackgroundColors from './BackgroundColors';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <BackgroundColors /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
