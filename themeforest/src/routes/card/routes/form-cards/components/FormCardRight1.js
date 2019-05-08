import React from 'react';
import LoginForm2 from 'routes/form/routes/forms/components/LoginForm2';

const Card = () => {
  return(
    <section className="form-card row no-gutters">
      <div className="form-card__img form-card__img--right col-lg-5 order-lg-2" style={{backgroundImage: "url('assets/images-demo/covers/annie-spratt-485365-unsplash.jpg')"}}></div>
      <div className="form-card__body col-lg-7 p-lg-6 p-4 order-lg-1">
        <LoginForm2 />
      </div>
    </section>
  );
}

export default Card;
