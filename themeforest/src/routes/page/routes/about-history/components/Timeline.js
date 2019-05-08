import React from 'react';
import { Icon } from 'antd';

const Timeline = () => (
  <section className="ui-timeline">

    <article className="tl-item alt">
      <div className="tl-body">
        <div className="tl-entry">
          <div className="tl-time">Jan. 2012</div>
          <div className="tl-icon icon-btn-round icon-btn icon-btn-thin btn-warning"><Icon type="bulb" /></div>
          <div className="tl-content">
            <h4 className="tl-title">An idea turns into a simple demo</h4>
            <img src="assets/images-demo/assets/600_400-3.jpg" className="rounded" alt="cover"/>
            <p>Ullam, commodi, modi, impedit nostrum odio sit odit necessitatibus accusantium enim voluptates culpa cupiditate cum pariatur a recusandae tenetur aspernatur at beatae.</p>
          </div>
        </div>
      </div>
    </article>

    <article className="tl-item">
      <div className="tl-body">
        <div className="tl-entry">
          <div className="tl-time">Jun. 2012</div>
          <div className="tl-icon icon-btn-round icon-btn icon-btn-thin btn-success"><Icon type="usergroup-add" /></div>
          <div className="tl-content">
            <h4 className="tl-title">Bootstrapped with friends' help</h4>
            <img src="assets/images-demo/assets/600_400-1.jpg" className="rounded" alt="cover"/>
            <p>Incidunt, molestias odio soluta nihil accusantium sit nostrum doloremque. Recusandae, ullam, odio consequatur facere totam reiciendis similique dicta explicabo!</p>
          </div>
        </div>
      </div>
    </article>

    <article className="tl-item alt">
      <div className="tl-body">
        <div className="tl-entry">
          <div className="tl-time">Feb. 2013</div>
          <div className="tl-icon icon-btn-round icon-btn icon-btn-thin btn-danger"><Icon type="notification" /></div>
          <div className="tl-content">
            <h4 className="tl-title">Lunch of the first product</h4>
            <img src="assets/images-demo/assets/600_400-2.jpg" className="rounded" alt="cover"/>
            <p>Ullam, commodi, modi, impedit nostrum odio sit odit necessitatibus accusantium enim voluptates culpa cupiditate cum pariatur a recusandae tenetur aspernatur at beatae.</p>
          </div>
        </div>
      </div>
    </article>

    <article className="tl-item">
      <div className="tl-body">
        <div className="tl-entry">
          <div className="tl-time">Nov. 2013</div>
          <div className="tl-icon icon-btn-round icon-btn icon-btn-thin btn-primary"><Icon type="smile-o" /></div>
          <div className="tl-content">
            <h4 className="tl-title">Second product lunch</h4>
            <img src="assets/images-demo/assets/600_400-3.jpg" className="rounded" alt="cover"/>
            <p>Ipsam, minus, quam, sit officiis accusantium sint voluptates voluptatibus minima cum non quos corrupti dolorem eligendi modi eius magnam unde!</p>
          </div>
        </div>
      </div>
    </article>


    <article className="tl-item alt">
      <div className="tl-body">
        <div className="tl-entry">
          <div className="tl-time">Mar. 2014</div>
          <div className="tl-icon icon-btn-round icon-btn icon-btn-thin btn-warning"><Icon type="shop" /></div>
          <div className="tl-content">
            <h4 className="tl-title">More following products</h4>
            <img src="assets/images-demo/assets/600_400-4.jpg" className="rounded" alt="cover"/>
            <p>Odit, iusto, dolorem, aut ipsum rem atque enim asperiores facere tempore explicabo omnis corporis hic! Molestias, dolores, iure esse at illo aliquam temporibus in eum cupiditate magni velit eveniet unde facilis quisquam numquam nihil atque tempore vitae porro maxime repellendus quas a sit repellat delectus expedita nam natus fugiat ut ipsam eaque voluptates omnis ratione?</p>
          </div>
        </div>
      </div>
    </article>

    <article className="tl-item">
      <div className="tl-body">
        <div className="tl-entry">
          <div className="tl-time">Now</div>
          <div className="tl-icon icon-btn-round icon-btn icon-btn-thin btn-success"><Icon type="line-chart" /></div>
          <div className="tl-content">
            <h4 className="tl-title">Happy working, happy living</h4>
            <img src="assets/images-demo/assets/600_400-6.jpg" className="rounded" alt="cover"/>
            <p>Illum veniam atque iste voluptatem eos saepe quisquam aperiam voluptatum sunt.</p>
          </div>
        </div>
      </div>
    </article>


  </section>
);

export default Timeline;
