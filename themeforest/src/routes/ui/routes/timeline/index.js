import React from 'react';
import { Route } from 'react-router-dom';

import Timeline from './routes/timeline/';
import TimelineLg from './routes/timeline-lg/';

const TimelineComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/timeline`} component={Timeline}/>
    <Route path={`${match.url}/timeline-lg`} component={TimelineLg}/>
  </div>
)

export default TimelineComponents;
