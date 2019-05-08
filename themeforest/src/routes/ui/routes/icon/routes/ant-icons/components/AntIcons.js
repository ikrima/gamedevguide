import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Icons from './Icons';

const Page = () => {
  return(
    <section className="container-fluid container-mw-xxl chapter page-icons">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">

          <article className="article">
            <h2 className="article-title">Ant Icons</h2>
            <Icons />
          </article>

        </div>
      </QueueAnim>
    </section>
  )
}

export default Page;
