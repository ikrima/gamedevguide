import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Alert from './routes/alert/';
import Message from './routes/message/';
import Modal from './routes/modal/';
import Notification from './routes/notification/';
import Popconfirm from './routes/popconfirm/';
import Progress from './routes/progress/';
import Spin from './routes/spin/';

let AsyncLoader = loadable({
  loader: () => import('./routes/loader/'),
  loading: LoadingComponent
})

const FeedbackComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/alert`} component={Alert}/>
    <Route path={`${match.url}/loader`} component={AsyncLoader}/>
    <Route path={`${match.url}/message`} component={Message}/>
    <Route path={`${match.url}/modal`} component={Modal}/>
    <Route path={`${match.url}/notification`} component={Notification}/>
    <Route path={`${match.url}/popconfirm`} component={Popconfirm}/>
    <Route path={`${match.url}/progress`} component={Progress}/>
    <Route path={`${match.url}/spin`} component={Spin}/>
  </div>
)

export default FeedbackComponents;
