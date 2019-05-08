import React from 'react';
import SignUpForm1 from 'routes/form/routes/forms/components/SignUpForm1'

const Card = () => {
  return(
    <section className="form-card">
      <div className="form-card__img" style={{backgroundImage: "url('assets/images-demo/covers/dan-freeman-401296-unsplash.jpg')", height: '320px'}}></div>
      <div className="form-card__body p-lg-5 p-4">
        <SignUpForm1 />
      </div>
    </section>
  );
}

export default Card;
