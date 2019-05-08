import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import MiniVersion from './MiniVersion';
import WithIcon from './WithIcon';
import SwitchStep from './SwitchStep';
import Vertical from './Vertical';
import VerticalMiniVersion from './VerticalMiniVersion';
import ErrorStatus from './ErrorStatus';
import DotStyle from './DotStyle';
import CustomizedDotStyle from './CustomizedDotStyle';

const Page = () => {
  return(
    <div className="container-fluid container-mw-xl no-breadcrumb chapter">
      <article className="article demo-style-steps">
        <h2 className="article-title">Steps</h2>

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <SwitchStep />
          </div>
          <div key="2" className="mb-3">
            <Basic />
          </div>
          <div key="3" className="mb-3">
            <MiniVersion />
          </div>
          <div key="4" className="mb-3">
            <WithIcon />
          </div>
          <div key="5" className="mb-3">
            <Vertical />
          </div>
          <div key="6" className="mb-3">
            <VerticalMiniVersion />
          </div>
          <div key="7" className="mb-3">
            <ErrorStatus />
          </div>
          <div key="8" className="mb-3">
            <DotStyle />
          </div>
          <div key="9" className="mb-3">
            <CustomizedDotStyle />
          </div>
        </QueueAnim>

      </article>
    </div>
  )
}

export default Page;