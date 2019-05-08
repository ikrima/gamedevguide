import React from 'react';
import testimonials from './testimonialsArray'

class Section extends React.Component {
  state = {
    testimonials,
  };

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Boxed</h2>
        <div className="row">
          {
            this.state.testimonials.map((testimonial, index) => (
              <div className="col-xl-4" key={index.toString()}>
                <div className="box box-default">
                  <div className="box-body">
                    <div className="testimonial-v3">
                      <img alt="avatar" className="avatar" src={testimonial.avatar} />
                      <blockquote>
                        {testimonial.content}
                      </blockquote>
                      <p className="citation">{testimonial.name}, {testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </article>
    );
  }
}

export default Section;
