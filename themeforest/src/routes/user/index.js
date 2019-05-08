import React from 'react';
import { Route } from 'react-router-dom';

import Login from './routes/Login'
import LoginV2 from './routes/LoginV2'
import SignUp from './routes/SignUp'
import SignUpV2 from './routes/SignUpV2'
import ForgotPassword from './routes/ForgotPassword'
import ForgotPasswordV2 from './routes/ForgotPasswordV2'
import './styles.scss';


const Page = ({ match }) => (
  <div>
    <Route path={`${match.url}/login`} component={Login}/>
    <Route path={`${match.url}/login-v2`} component={LoginV2}/>
    <Route path={`${match.url}/sign-up`} component={SignUp}/>
    <Route path={`${match.url}/sign-up-v2`} component={SignUpV2}/>
    <Route path={`${match.url}/forgot-password`} component={ForgotPassword}/>
    <Route path={`${match.url}/forgot-password-v2`} component={ForgotPasswordV2}/>
  </div>
)

export default Page;
