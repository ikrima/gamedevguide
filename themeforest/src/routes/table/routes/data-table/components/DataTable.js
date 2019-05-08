import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Ajax from './Ajax';
import EditableCells from './EditableCells';
import EditableRows from './EditableRows';

const Page = () => {
  return(
    <div className="container-fluid container-mw-xxl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <Ajax /> </div>
        <div className="article__section" key="2"> <EditableCells /> </div>
        <div className="article__section" key="3"> <EditableRows /> </div>
      </QueueAnim>
    </div>
  )
}

export default Page;