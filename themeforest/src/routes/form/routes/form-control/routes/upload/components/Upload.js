import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Avatar from './Avatar';
import DragAndDrop from './DragAndDrop';
import PicturesWall from './PicturesWall';
import UploadByClicking from './UploadByClicking';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-upload">
        <h2 className="article-title">Upload</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <UploadByClicking />
          </div>
          <div key="2" className="mb-3">
            <DragAndDrop />
          </div>
          <div key="3" className="mb-3">
            <Avatar />
          </div>
          <div key="4" className="mb-3">
            <PicturesWall />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;