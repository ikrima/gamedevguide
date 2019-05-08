import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import ImageBg from './ImageBg';
import Jumbotron1 from './Jumbotron1';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <Jumbotron1 /> </div>
        <div key="2" className="mb-3"> <ImageBg /> </div>
        <div key="3" className="mb-3"> <Basic /> </div>
      </QueueAnim>
    </div>
  )
}

export default Page;
