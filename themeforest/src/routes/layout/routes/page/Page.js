import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Slider } from 'antd';

// const Section2 = () => (
//   <article className="article">
//     <h2 className="article-title">Page Section <div className="badge badge-pill">2</div></h2>
//     <div>Section content 2</div>
//   </article>
// )

// const Section3 = () => (
//   <article className="article">
//     <h2 className="article-title">Page Section <div className="badge badge-pill">3</div></h2>
//     <div>Section content 3</div>
//   </article>
// )

function formatter(value) {
  return `${value}px`;
}

class Page extends React.Component {

  state = {
    pageWidth: 720
  }

  onChange = (value) => {
    this.setState({ pageWidth: value })
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumb chapter" style={{maxWidth: `${this.state.pageWidth}px`}}>
        <QueueAnim type="bottom" className="ui-animate">
          <div className="article__section" key="1"> 
            <article className="article">
              <h2 className="article-title">Page Container Width</h2>
              <div className="box box-default mb-5">
                <div className="box-body py-4">
                  <p className="mb-4">While you can change container width to any value you want (from <code>1px</code> to <code>100% width</code>), normally, it's recommended to set between <code>540px</code> to <code>1400px</code></p>
                  <Slider min={540} max={1400} defaultValue={this.state.pageWidth} onChange={this.onChange} tipFormatter={formatter} />
                </div>
              </div>

              <p>By default, the page container width is <code>100%</code>. However, you can change it by adding a simple CSS class to the page container</p>
              <ul>
                <li><code>.container-mw-sm</code> class set the container max width to <code>540px</code></li>
                <li><code>.container-mw-md</code> class set the container max width to <code>720px</code></li>
                <li><code>.container-mw-lg</code> class set the container max width to <code>960px</code></li>
                <li><code>.container-mw-xl</code> class set the container max width to <code>1140px</code></li>
                <li><code>.container-mw-xxl</code> class set the container max width to <code>1400px</code></li>
              </ul>
            </article>
          </div>
        </QueueAnim>
      </div>
    )
  }
}

export default Page;
