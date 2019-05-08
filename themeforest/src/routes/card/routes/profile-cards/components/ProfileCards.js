import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ProfileCards1 from './ProfileCards1';
import ProfileCards2 from './ProfileCards2';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section mb-3" key="1"> <ProfileCards1 /> </div>
        <div className="article__section mb-3" key="2"> <ProfileCards2 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
