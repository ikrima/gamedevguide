import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ColorPalettes from './ColorPalettes';


const Page = () => {
  return(
    <div className="container-fluid container-mw-xxl no-breadcrumb chapter">
      <article className="article">
        <h2 className="article-title">Colors</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
              <div className="row">
                <div className="col-xl-5">
                  <p>Ant Design's base color palette totals 120 colors, including 12 primary colors and their derivative colors. These colors can basically include the need for color in background applications design.</p>
                </div>
              </div>
          </div>
          <div key="2">
            <ColorPalettes />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;