import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ImageCards1 from './ImageCards1';
import ImageCards2 from './ImageCards2';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <ImageCards1 /> </div>
        <div className="article__section" key="2"> <ImageCards2 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
