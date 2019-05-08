import React from 'react';
import QueueAnim from 'rc-queue-anim';
import PortfolioCards1 from './PortfolioCards1';
import PortfolioCards2 from './PortfolioCards2';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-xl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <PortfolioCards1 /> </div>
        <div className="article__section" key="2"> <PortfolioCards2 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
