import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CustomizedDescription from './CustomizedDescription';
import Delay from './Delay';
import EmbeddedMode from './EmbeddedMode';
import Size from './Size';
import CustomSpinningIndicator from './CustomSpinningIndicator';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-spin">
        <h2 className="article-title">Spin</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3"> <Size /> </div>
          <div key="2" className="mb-3"> <CustomizedDescription /> </div>
          <div key="3" className="mb-3"> <EmbeddedMode /> </div>
          <div key="4" className="mb-3"> <Delay /> </div>
          <div key="5" className="mb-3"> <CustomSpinningIndicator /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;