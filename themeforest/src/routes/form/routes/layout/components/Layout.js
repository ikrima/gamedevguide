import React from 'react';
import QueueAnim from 'rc-queue-anim';
import FormLayout from './FormLayout';
import FormModal from './FormModal';

const Page = () => {
  return(
    <div className="container-fluid container-mw-lg chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <FormLayout /> </div>
        <div className="article__section" key="2"> <FormModal /> </div>
      </QueueAnim>
    </div>
  )
}

export default Page;