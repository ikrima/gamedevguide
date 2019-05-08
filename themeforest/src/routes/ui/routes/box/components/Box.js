import React from 'react';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';

const BasicBoxes = () => (
  <article className="article">
    <h2 className="article-title">Basic Boxes</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-v1 mb-4">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam.
          </div>
          <a href={DEMO.link} className="link-cta link-animated-hover link-hover-v1">Link <Icon type="arrow-right" /></a>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-v1 mb-4">
          <div className="box-badge"><span className="badge badge-pill badge-primary">Badge</span></div>
          <div className="box-header">Box with Badge</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam.
          </div>
          <a href={DEMO.link} className="link-cta link-animated-hover link-hover-v1">Link <Icon type="arrow-right" /></a>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header box-light">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header">Box Header</div>
          <div className="box-body box-light">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
  </article>
)

const BoxesWithStyle = () => (
  <article className="article">
    <h2 className="article-title">Styles</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default">
          <div className="box-header">Box with Divider</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="box box-default bg-transparent">
          <div className="box-header">No Background</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="box box-default box-transparent">
          <div className="box-header">Transparent Box</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
  </article>
)

const BoxColors = () => (
  <article className="article">
    <h2 className="article-title">Colors</h2>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default mb-3">
          <div className="box-header bg-dark text-body-reverse">Box Header</div>
          <div className="box-body bg-white">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default mb-3">
          <div className="box-header bg-white">Box Header</div>
          <div className="box-body bg-dark text-body-reverse">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default mb-3 bg-dark text-body-reverse">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default mb-3">
          <div className="box-header bg-white">Box Header</div>
          <div className="box-body bg-white">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default mb-3 bg-primary text-body-reverse">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default mb-3 bg-info text-body-reverse">
          <div className="box-header">Box Header</div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="box box-default mb-3 bg-success text-body-reverse">
          <div className="box-header">Box Header</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default mb-3 bg-warning">
          <div className="box-header">Box Header</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="box box-default mb-3 bg-danger text-body-reverse">
          <div className="box-header">Box Header</div>
          <div className="box-divider"></div>
          <div className="box-body">
            This is the body of box component. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quasi nam. Nisi assumenda nulla consequatur perferendis, voluptatum, laborum provident eos amet quos, ullam possimus facilis quasi? Magnam optio voluptates ipsam.
          </div>
        </div>
      </div> 
    </div>
  </article>
)


const Page = () => {
  return (
    <section className="container-fluid container-mw-xxl chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"><BasicBoxes /></div>
        <div className="article__section" key="2"><BoxesWithStyle /></div>
        <div className="article__section" key="3"><BoxColors /></div>
      </QueueAnim>
    </section>
  )
}

export default Page;
