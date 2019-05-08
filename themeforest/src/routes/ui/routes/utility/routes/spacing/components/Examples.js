import React from 'react';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Examples</h2>
    <p>Here are some representative examples of these classes:</p>
    <div className="box box-default">
      <div className="box-body">
<pre>{`
  .mt-7 {
    margin-top: 6rem !important;
  }

  .px-7 {
    padding-left: 6rem !important;
    padding-right: 6rem !important;
  }
`}
</pre>
      </div>
    </div>

    <div className="bg-gray-200 mb-1 w-100"></div>
  </article>
)

export default Section;
