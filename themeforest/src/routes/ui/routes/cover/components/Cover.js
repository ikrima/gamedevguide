import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Cover1 from './Cover1';
import Cover2 from './Cover2';


const Page = () => {
  return(
    <div className="no-breadcrumb chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Cover1 /> </div>
        <div key="2"> <Cover2 /> </div>
      </QueueAnim>
    </div>
  );
}


export default Page;