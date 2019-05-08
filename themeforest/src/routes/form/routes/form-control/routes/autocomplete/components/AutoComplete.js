import React from 'react';
import QueueAnim from 'rc-queue-anim';
import BasicUsage from './BasicUsage'
import CustomizeInputComponent from './CustomizeInputComponent'
import LookupPatternsCertainCategory from './LookupPatternsCertainCategory'
import Customized from './Customized'
import NonCaseSensitiveAutoComplete from './NonCaseSensitiveAutoComplete'
import LookupPatternsUncertainCategory from './LookupPatternsUncertainCategory'


const Article = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title">AutoComplete</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <BasicUsage />
          </div>
          <div key="2" className="mb-3">
            <CustomizeInputComponent />
          </div>
          <div key="3" className="mb-3">
            <LookupPatternsCertainCategory />
          </div>
          <div key="4" className="mb-3">
            <Customized />
          </div>
          <div key="5" className="mb-3">
            <NonCaseSensitiveAutoComplete />
          </div>
          <div key="6" className="mb-3">
            <LookupPatternsUncertainCategory />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Article;