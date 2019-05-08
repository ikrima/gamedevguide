import React from 'react';
import QueueAnim from 'rc-queue-anim';
import AdvancedSearch from './AdvancedSearch';
import HorizontalLoginForm from './HorizontalLoginForm';
import LoginForm1 from './LoginForm1';
import LoginForm2 from './LoginForm2';
import SignUpForm1 from './SignUpForm1';
import SignUpForm2 from './SignUpForm2';
import ResetPassword1 from './ResetPassword1';
import Subscribe1 from './Subscribe1';


const Article1 = () => (
  <article className="article">
    <h2 className="article-title">Login</h2>
    <div className="box box-default">
      <div className="box-body p-5">
        <LoginForm1 />
      </div>
    </div>
  </article>
);

const Article2 = () => (
  <article className="article">
    <h2 className="article-title">Login</h2>
    <div className="box box-default">
      <div className="box-body p-5">
        <LoginForm2 />
      </div>
    </div>
  </article>
);

const Article3 = () => (
  <article className="article">
    <h2 className="article-title">Sign Up</h2>
    <div className="box box-default">
      <div className="box-body p-5">
        <SignUpForm1 />
      </div>
    </div>
  </article>
);

const Article4 = () => (
  <article className="article">
    <h2 className="article-title">Sign Up</h2>
    <div className="box box-default">
      <div className="box-body p-5">
        <SignUpForm2 />
      </div>
    </div>
  </article>
);

const Article5 = () => (
  <article className="article">
    <h2 className="article-title">Reset Password</h2>
    <div className="box box-default">
      <div className="box-body p-5">
        <ResetPassword1 />
      </div>
    </div>
  </article>
);

const Article6 = () => (
  <article className="article">
    <h2 className="article-title">Subscribe</h2>
    <div className="box box-default">
      <div className="box-body p-5">
        <Subscribe1 />
      </div>
    </div>
  </article>
);


const Page = () => {
  return(
    <div className="container-fluid container-mw-md chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div className="article__section" key="1"> <Article1 /> </div>
        <div className="article__section" key="2"> <Article2 /> </div>
        <div className="article__section" key="3"> <Article3 /> </div>
        <div className="article__section" key="4"> <Article4 /> </div>
        <div className="article__section" key="5"> <Article5 /> </div>
        <div className="article__section" key="6"> <Article6 /> </div>
        <div className="article__section" key="7"> 
          <HorizontalLoginForm /> 
          <AdvancedSearch />
        </div>
      </QueueAnim>
    </div>
  )
}

export default Page;