import React from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;


const Section = () => (
  <article className="article">
    <h2 className="article-title text-center">Contact Us</h2>
    <div className="container-fluid container-mw-xl">
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-transparent">
            <div className="box-body">
              <h4>Get In Touch</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur necessitatibus ea possimus est quis cumque vel saepe. Eum, quas, ducimus.</p>
              <div className="divider divider-solid" />
              <p>123 Mountain View <br /> Santa Clara, C.A. <br /> USA</p>
              <div className="divider divider-solid" />
              <p>
                <strong>E:</strong> mail@site.com
                <br />
                <strong>P:</strong> +1 234 56789
                <br />
                <strong>S:</strong> www.site.com
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="box box-transparent">
            <div className="box-body">
              <h4>Contact</h4>
              <form name="contactForm">
                <div className="mb-2">
                  <Input placeholder="Name" />
                </div>
                <div className="mb-2">
                  <Input placeholder="Email" />
                </div>
                <div className="mb-2">
                  <TextArea
                    type="textarea"
                    rows={4}
                    placeholder="Message"
                  />
                </div>
                <div className="divider" />
                <Button type="primary">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

export default Section;

