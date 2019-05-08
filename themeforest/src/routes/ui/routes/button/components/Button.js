import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ButtonGroup from './ButtonGroup';
import Disabled from './Disabled';
import GhostButton from './GhostButton';
import Icon from './Icon';
import Loading from './Loading';
import MultipleButtons from './MultipleButtons';
import Size from './Size';
import Type from './Type';

const Page = () => {
  return(
    <div className="container-fluid container-mw-xxl chapter">
      <article className="article demo-style-button">
        <h2 className="article-title">Buttons</h2>
        <div className="row">
          <div className="col-xl-6">
            <QueueAnim type="bottom" className="ui-animate">
              <div className="mb-3" key="1">
                <Type />
              </div>
              <div className="mb-3" key="2">
                <Size />
              </div>
              <div className="mb-3" key="3">
                <Loading />
              </div>
              <div className="mb-3" key="4">
                <ButtonGroup />
              </div>
            </QueueAnim>
          </div>
          <div className="col-xl-6">
            <QueueAnim type="bottom" className="ui-animate">
              <div className="mb-3" key="1">
                <Icon />
              </div>
              <div className="mb-3" key="2">
                <Disabled />
              </div>
              <div className="mb-3" key="3">
                <MultipleButtons />
              </div>
              <div className="mb-3" key="4">
                <GhostButton />
              </div>
            </QueueAnim>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Page;