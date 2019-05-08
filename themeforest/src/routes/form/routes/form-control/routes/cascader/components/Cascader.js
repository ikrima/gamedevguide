import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import CustomTrigger from './CustomTrigger';
import DefaultValue from './DefaultValue';
import DisabledOption from './DisabledOption';
import Search from './Search';
import Size from './Size';


const Article = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">Cascader</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <CustomTrigger />
          </div>
          <div key="3" className="mb-3">
            <Size />
          </div>
          <div key="4" className="mb-3">
            <DefaultValue />
          </div>
          <div key="5" className="mb-3">
            <DisabledOption />
          </div>
          <div key="6" className="mb-3">
            <Search />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Article;