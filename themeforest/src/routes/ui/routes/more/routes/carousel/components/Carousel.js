import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import FadeIn from './FadeIn';
import ScrollAutomatically from './ScrollAutomatically';
import Vertical from './Vertical';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-carousel">
        <h2 className="article-title">Carousel</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div className="mb-3" key="1"> <ScrollAutomatically /> </div>
          <div className="mb-3" key="2"> <Basic /> </div>
          <div className="mb-3" key="3"> <FadeIn /> </div>
          <div className="mb-3" key="4"> <Vertical /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;