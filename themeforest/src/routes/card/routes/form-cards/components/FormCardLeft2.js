import React from 'react';
import Subscribe1 from 'routes/form/routes/forms/components/Subscribe1';

const Card = () => {
  return(
    <section className="form-card row no-gutters">
      <div className="form-card__img form-card__img--left col-lg-6" style={{backgroundImage: "url('assets/images-demo/covers/bruno-martins-442125-unsplash.jpg')"}}></div>
      <div className="form-card__body col-lg-6 p-lg-6 p-4">
        <Subscribe1 />
      </div>
    </section>
  );
}

export default Card;
