import React from 'react';
import QueueAnim from 'rc-queue-anim';
import LoginForm2 from 'routes/form/routes/forms/components/LoginForm2';

const Cover = () => (
  <section className="cover cover-page">
    <div className="cover-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/bench-accounting-49909-unsplash-lg.jpg)'}}></div>
    <div className="cover-form-container">
      <div className="col-12 col-md-8 col-lg-6 col-xl-4">
        <LoginForm2 />
      </div>
    </div>
  </section>
)

const Page = () => (
  <QueueAnim type="bottom" className="ui-animate">
    <div key="1">
      <Cover />
    </div>
  </QueueAnim>
)

export default Page;
