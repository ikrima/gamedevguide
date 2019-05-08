import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Icon } from 'antd'; 

const Divider1 = () => (
  <div className="box box-default">
    <div className="box-header">Divider</div>
    <div className="box-body">
      <code>.divider</code> you won't see the divider below, because the default color of divider is transparent. 
      <div className="divider"></div>
      <code>.divider .divider-solid .mb-6</code> using divider along with Bootstrap <em>Spacing</em> utility class. <code>mb-</code> is short for <em>margin-bottom</em>
      <div className="divider divider-solid mb-6"></div>
      <code>.divider-solid .divider-solid border-primary</code> using divider along with Bootstrap <em>Borders</em> utility class to change the color.
      <div className="divider divider-solid border-primary mb-6"></div>
      <code>.divider .divider-solid</code> divider has multiple styles to choose from, including <em>solid, dashed, dotted, double</em>
      <div className="divider divider-solid mb-6"></div>
      <code>.divider .divider-dashed</code>
      <div className="divider divider-dashed"></div>
      <code>.divider .divider-dashed .border-info</code>
      <div className="divider divider-dashed border-info mb-6"></div>
      <code>.divider .divider-dotted</code>
      <div className="divider divider-dotted"></div>
      <code>.divider .divider-dotted .border-warning</code>
      <div className="divider divider-dotted border-warning mb-6"></div>
      <code>.divider .divider-double</code>
      <div className="divider divider-double"></div>
      <code>.divider .divider-double .border-success</code>
      <div className="divider divider-double border-success mb-6"></div>
    </div>
  </div>
)

const Divider2 = () => (
  <div className="box box-default">
    <div className="box-header">Dividers with Text or Icons</div>
    <div className="box-body">
      <code>.divider .divider-with-content</code> 
      <div className="divider divider-with-content"><span className="divider-inner-content">Text</span></div>

      <div className="divider my-4"></div>

      <div className="divider divider-with-content"><span className="divider-inner-content"><Icon type="calendar" /></span></div>
    </div>
  </div>
)

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title mb-3">Divider</h2>
        <p className="mb-5">Pure CSS, light weight & easy to customize.</p>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3"> <Divider1 /> </div>
          <div key="2" className="mb-3"> <Divider2 /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;