import React from 'react';
import QueueAnim from 'rc-queue-anim';
import "./loaders/loaders.scss"
import "./demo.scss"

const Loader1 = () => (
  <div className="ball-pulse">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader2 = () => (
  <div className="ball-grid-pulse">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader3 = () => (
  <div className="ball-clip-rotate">
    <div></div>
  </div>
)

const Loader4 = () => (
  <div className="ball-clip-rotate-pulse">
    <div></div>
    <div></div>
  </div>
)

const Loader5 = () => (
  <div className="ball-clip-rotate-multiple">
    <div></div>
    <div></div>
  </div>
)

const Loader6 = () => (
  <div className="ball-pulse-rise">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader7 = () => (
  <div className="ball-rotate">
    <div></div>
  </div>
)

const Loader8 = () => (
  <div className="ball-zig-zag">
    <div></div>
    <div></div>
  </div>
)

const Loader9 = () => (
  <div className="ball-zig-zag-deflect">
    <div></div>
    <div></div>
  </div>
)

const Loader10 = () => (
  <div className="ball-triangle-path">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader11 = () => (
  <div className="ball-scale">
    <div></div>
  </div>
)

const Loader12 = () => (
  <div className="line-scale">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader13 = () => (
  <div className="line-scale-party">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

)

const Loader14 = () => (
  <div className="ball-scale-multiple">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader15 = () => (
  <div className="ball-pulse-sync">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader16 = () => (
  <div className="ball-beat">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader17 = () => (
  <div className="line-scale-pulse-out">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader18 = () => (
  <div className="line-scale-pulse-out-rapid">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader19 = () => (
  <div className="ball-scale-ripple">
    <div></div>
  </div>
)

const Loader20 = () => (
  <div className="ball-scale-ripple-multiple">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader21 = () => (
  <div className="ball-spin-fade-loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader22 = () => (
  <div className="line-spin-fade-loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader23 = () => (
  <div className="ball-grid-beat">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

const Loader24 = () => (
  <div className="ball-scale-random">
    <div></div>
    <div></div>
    <div></div>
  </div>
)







// https://github.com/ConnorAtherton/loaders.css

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <article className="article">
        <h2 className="article-title mb-3">Loaders</h2>
        <p className="mb-5">Pure CSS. Light weight & easy to customize.</p>

        <div className="box box-default border-0 bg-info">
          <div className="box-body">

            <QueueAnim type="bottom" className="ui-animate">
              <div key="1" className="loader-container"> 
                <div><Loader1 /></div>
                <div><Loader2 /></div>
                <div><Loader3 /></div>
                <div><Loader4 /></div>
                <div><Loader5 /></div>
                <div><Loader6 /></div>
                <div><Loader7 /></div>
                <div><Loader8 /></div>
                <div><Loader9 /></div>
                <div><Loader10 /></div>
                <div><Loader11 /></div>
                <div><Loader12 /></div>
                <div><Loader13 /></div>
                <div><Loader14 /></div>
                <div><Loader15 /></div>
                <div><Loader16 /></div>
                <div><Loader17 /></div>
                <div><Loader18 /></div>
                <div><Loader19 /></div>
                <div><Loader20 /></div>
                <div><Loader21 /></div>
                <div><Loader22 /></div>
                <div><Loader23 /></div>
                <div><Loader24 /></div>
              </div>
            </QueueAnim>

          </div>
        </div>
      </article>
    </div>
  )
}

export default Page;