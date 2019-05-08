import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import BorderTitleAndFooter from './BorderTitleAndFooter';
import ColSpanAndRowSpan from './ColSpanAndRowSpan';
import ExpandableRow from './ExpandableRow';
import FixedColumns from './FixedColumns';
import FixedColumnsAndHeader from './FixedColumnsAndHeader';
import FixedHeader from './FixedHeader';
import GroupingTableHead from './GroupingTableHead';
import NestedTables from './NestedTables';
import ResetFiltersAndSorters from './ResetFiltersAndSorters';
import Selection from './Selection';
import Size from './Size';
import TreeData from './TreeData';

const Page = () => {
  return(
    <div className="container-fluid container-mw-xl chapter">

      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <Basic /> </div>
        <div className="article__section" key="2"> <BorderTitleAndFooter /> </div>
        <div className="article__section" key="3"> <ColSpanAndRowSpan /> </div>
        <div className="article__section" key="4"> <ExpandableRow /> </div>
        <div className="article__section" key="5"> <FixedColumns /> </div>
        <div className="article__section" key="6"> <FixedColumnsAndHeader /> </div>
        <div className="article__section" key="7"> <FixedHeader /> </div>
        <div className="article__section" key="8"> <GroupingTableHead /> </div>
        <div className="article__section" key="9"> <NestedTables /> </div>
        <div className="article__section" key="10"> <ResetFiltersAndSorters /> </div>
        <div className="article__section" key="11"> <Selection /> </div>
        <div className="article__section" key="12"> <Size /> </div>
        <div className="article__section" key="13"> <TreeData /> </div>
      </QueueAnim>

    </div>
  )
}

export default Page;