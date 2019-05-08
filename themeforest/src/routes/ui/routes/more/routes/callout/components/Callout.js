import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Callout1 = () => (
  <div className="callout callout-info">
    <h4>Callout heading</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?</p>
  </div>
)

const Callout2 = () => (
  <div className="callout callout-success">
    <h4>Callout heading</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?</p>
  </div>
)

const Callout3 = () => (
  <div className="callout callout-warning">
    <h4>Callout heading</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?</p>
  </div>
)

const Callout4 = () => (
  <div className="callout callout-danger">
    <h4>Callout heading</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?</p>
  </div>
)

const Callout5 = () => (
  <div className="callout">
    <h4>Callout heading</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?</p>
  </div>
)

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Callout</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3"> <Callout1 /> </div>
          <div key="2" className="mb-3"> <Callout2 /> </div>
          <div key="3" className="mb-3"> <Callout3 /> </div>
          <div key="4" className="mb-3"> <Callout4 /> </div>
          <div key="5" className="mb-3"> <Callout5 /> </div>
        </QueueAnim>
      </article>
    </div>
  );
}

export default Page;
