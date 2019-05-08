import React from 'react';
import QueueAnim from 'rc-queue-anim';
import SignUpForm2 from 'routes/form/routes/forms/components/SignUpForm2';

const FormCard = () => (
  <section className="form-card-page form-card row no-gutters">
    <div className="form-card__img form-card__img--left col-lg-6" style={{backgroundImage: "url('assets/images-demo/covers/alexandre-perotto-75274-unsplash.jpg')"}}></div>
    <div className="form-card__body col-lg-6 p-5 px-lg-8 d-flex align-items-center">
      <SignUpForm2 />
    </div>
  </section>
)

const Page = () => (
  <QueueAnim type="bottom" className="ui-animate">
    <div key="1">
      <FormCard />
    </div>
  </QueueAnim>
)

export default Page;
