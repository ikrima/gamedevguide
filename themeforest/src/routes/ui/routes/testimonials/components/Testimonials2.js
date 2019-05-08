import React from 'react';
import testimonials from './testimonialsArray'

class Section extends React.Component {
  state = {
    testimonials,
  };

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Testimonials <span className="badge badge-pill">v2</span></h2>
        <div className="row">
          {
            this.state.testimonials.map((testimonial, index) => (
              <div className="col-xl-4" key={index.toString()}>

                <div className={`testimonial-v2 ${testimonial.color}`}>
                  <div className="testimonial-meta">
                    <div className="testimonial-content">{testimonial.content}</div>
                    <cite>
                      <span className="author-name">{testimonial.name}</span>, <span className="author-desc">{testimonial.title}</span>
                    </cite>
                  </div>
                  <div className="author-img"> <img alt="avatar" className="avatar" src={testimonial.avatar} /> </div>
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
