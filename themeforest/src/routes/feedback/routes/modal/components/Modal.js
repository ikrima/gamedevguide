import React from 'react';
import QueueAnim from 'rc-queue-anim';
import AsynchronouslyClose from './AsynchronouslyClose';
import Centered from './Centered';
import ConfirmationModalDialog from './ConfirmationModalDialog';
import InformationModalDialog from './InformationModalDialog';
import CustomModalExamples from './CustomModalExamples';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Modal & Dialog</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div className="mb-3" key="1"> <CustomModalExamples /> </div>
          <div className="mb-3" key="2"> <ConfirmationModalDialog /> </div>
          <div className="mb-3" key="3"> <InformationModalDialog /> </div>
          <div className="mb-3" key="4"> <AsynchronouslyClose /> </div>
          <div className="mb-3" key="5"> <Centered /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;