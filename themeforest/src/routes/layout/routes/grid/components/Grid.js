import React from 'react';
import QueueAnim from 'rc-queue-anim';
import GridExample from './GridExample';
import GridTable from './GridTable';
import "./styles.scss"

const Grids = () => {
  return(
    <section className="container-fluid container-mw-xxl chapter page-grids">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <GridTable /> </div>
        <div key="2"> <GridExample /> </div>
      </QueueAnim>
    </section>
  )
}

export default Grids;
