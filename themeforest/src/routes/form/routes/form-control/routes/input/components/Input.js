import React from 'react';
import QueueAnim from 'rc-queue-anim';
import AutosizingTheHeightToFitTheContent from './AutosizingTheHeightToFitTheContent';
import Basic from './Basic';
import FormatTooltipInput from './FormatTooltipInput';
import InputGroup from './InputGroup';
import PrefixAndSuffix from './PrefixAndSuffix';
import PrePostTab from './PrePostTab';
import SearchBox from './SearchBox';
import Textarea from './Textarea';
import ThreeSizesOfInput from './ThreeSizesOfInput';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <article className="article demo-style-input">
        <h2 className="article-title">Input</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Basic />
          </div>
          <div key="2" className="mb-3">
            <PrePostTab />
          </div>
          <div key="3" className="mb-3">
            <SearchBox />
          </div>
          <div key="4" className="mb-3">
            <AutosizingTheHeightToFitTheContent />
          </div>
          <div key="5" className="mb-3">
            <PrefixAndSuffix />
          </div>
          <div key="6" className="mb-3">
            <ThreeSizesOfInput />
          </div>
          <div key="7" className="mb-3">
            <InputGroup />
          </div>
          <div key="8" className="mb-3">
            <Textarea />
          </div>
          <div key="9" className="mb-3">
            <FormatTooltipInput />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;