import React from 'react';
import QueueAnim from 'rc-queue-anim';
import FormCardLeft1 from './FormCardLeft1';
import FormCardLeft2 from './FormCardLeft2';
import FormCardRight1 from './FormCardRight1';
import FormCardRight2 from './FormCardRight2';
import FormCardCentered1 from './FormCardCentered1';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <article className="article">
        <h2 className="article-title">Form Cards</h2>
        <div className="callout callout-info">
          <div className="col-md-8 pl-0">
            <p>Form Cards take advantage of Bootstrap's powerful grid system. You can easily change the width and order of cover image by changing the CSS class.</p>
          </div>
        </div> 
        <QueueAnim type="bottom" className="ui-animate">
          <div className="mb-5" key="1"> <FormCardLeft1 /> </div>
          <div className="mb-5" key="2"> <FormCardRight1 /> </div>
          <div className="mb-5" key="3"> <FormCardLeft2 /> </div>
          <div className="mb-5" key="4"> <FormCardRight2 /> </div>
          <div className="mb-5" key="5"> <FormCardCentered1 /> </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
