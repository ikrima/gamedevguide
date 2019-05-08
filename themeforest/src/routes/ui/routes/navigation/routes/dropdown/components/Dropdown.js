import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import ButtonWithDropdownMenu from './ButtonWithDropdownMenu';
import CascadingMenu from './CascadingMenu';
import Placement from './Placement';
import TriggerMode from './TriggerMode';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Dropdown</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <TriggerMode />
          </div>
          <div key="3" className="mb-3">
            <CascadingMenu />
          </div>
          <div key="4" className="mb-3">
            <Placement />
          </div>
          <div key="5" className="mb-3">
            <ButtonWithDropdownMenu />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;