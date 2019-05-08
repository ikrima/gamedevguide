import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import Colors from './Colors';
import CircularProgressBar from './CircularProgressBar';
import Dynamic from './Dynamic';
import DynamicCircularProgressBar from './DynamicCircularProgressBar';
import MiniSizeCircularProgressBar from './MiniSizeCircularProgressBar';
import MiniSizeProgressBar from './MiniSizeProgressBar';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-progress">
        <h2 className="article-title">Progress</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3"> <Basic /> </div>
          <div key="2" className="mb-3"> <MiniSizeProgressBar /> </div>
          <div key="3" className="mb-3"> <Dynamic /> </div>
          <div key="4" className="mb-3"> <CircularProgressBar /> </div>
          <div key="5" className="mb-3"> <MiniSizeCircularProgressBar /> </div>
          <div key="6" className="mb-3"> <DynamicCircularProgressBar /> </div>
          <div key="7" className="mb-3"> <Colors /> </div>

        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;