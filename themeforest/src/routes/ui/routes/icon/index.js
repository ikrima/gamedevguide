import React from 'react';
import { Route } from 'react-router-dom';

import AntIcons from './routes/ant-icons/';
import SocialIcons from './routes/social-icons/';

const FeedbackComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/ant-icons`} component={AntIcons}/>
    <Route path={`${match.url}/social-icons`} component={SocialIcons}/>
  </div>
)

export default FeedbackComponents;
