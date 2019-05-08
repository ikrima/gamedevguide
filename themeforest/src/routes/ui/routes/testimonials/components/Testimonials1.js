import React from 'react';
import testimonials from './testimonialsArray'

class Section extends React.Component {
  state = {
    testimonials,
  };

  render() {
    return (
      <article className="article">
        <div className="article-title">Testimonials <span className="badge badge-pill">v1</span></div>
        <div className="row">
          {
            this.state.testimonials.map((testimonial, index) => (
              <div className="col-xl-4" key={index.toString()}>

                <div className="testimonial-v1">
                  <div className="testimonial-content">{testimonial.content}</div>
                  <div className="testimonial-meta">
                    <div className="author-infos-holder">
                      <div className="author-img"> <img alt="avatar" className="avatar" src={testimonial.avatar} /> </div>
                      <div className="author-infos">
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-desc">{testimonial.title}</div>
                      </div>
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
