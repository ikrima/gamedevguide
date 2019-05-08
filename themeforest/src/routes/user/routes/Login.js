import React from 'react';
import QueueAnim from 'rc-queue-anim';
import LoginForm2 from 'routes/form/routes/forms/components/LoginForm2';

const FormCard = () => (
  <section className="form-card-page form-card row no-gutters">
    <div className="form-card__img form-card__img--left col-lg-6" style={{backgroundImage: "url('assets/images-demo/covers/bruno-martins-442125-unsplash.jpg')"}}></div>
    <div className="form-card__body col-lg-6 p-5 px-lg-8 d-flex align-items-center">
      <LoginForm2 />
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
