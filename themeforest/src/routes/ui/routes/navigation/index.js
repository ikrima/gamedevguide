import React from 'react';
import { Route } from 'react-router-dom';

import Affix from './routes/affix/';
import Breadcrumb from './routes/breadcrumb/';
import Dropdown from './routes/dropdown/';
import Pagination from './routes/pagination/';

const FeedbackComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/affix`} component={Affix}/>
    <Route path={`${match.url}/breadcrumb`} component={Breadcrumb}/>
    <Route path={`${match.url}/dropdown`} component={Dropdown}/>
    <Route path={`${match.url}/pagination`} component={Pagination}/>
  </div>
)

export default FeedbackComponents;
