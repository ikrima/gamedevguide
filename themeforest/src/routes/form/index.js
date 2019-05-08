import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Layout from './routes/layout/'
import Steps from './routes/steps/'
import Validation from './routes/validation/'

let FormControl = loadable({
  loader: () => import('./routes/form-control/'),
  loading: LoadingComponent
})
let Forms = loadable({
  loader: () => import('./routes/forms/'),
  loading: LoadingComponent
})

const Form = ({ match }) => (
  <div>
    <Route path={`${match.url}/form-control`} component={FormControl}/>
    <Route path={`${match.url}/forms`} component={Forms}/>
    <Route path={`${match.url}/layout`} component={Layout}/>
    <Route path={`${match.url}/steps`} component={Steps}/>
    <Route path={`${match.url}/validation`} component={Validation}/>
  </div>
)

export default Form;
