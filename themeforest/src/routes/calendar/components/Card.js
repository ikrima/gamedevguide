import React from 'react';
import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const Article = () => {
  return(
    <article className="article">
      <h2 className="article-title">Card</h2>
      <div className="box box-default demo-style-calendar">
        <div className="box-body">
          <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </div>
      </div>
    </article>
  )
}

export default Article;