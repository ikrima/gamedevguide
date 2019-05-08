import React from 'react';
import QueueAnim from 'rc-queue-anim';


let numberArray = [];

for(let i = 1; i <= 12; i++){
    numberArray.push(i);
}

const Page = () => {
  return(
    <div className="container-fluid container-mw-xl no-breadcrumb chapter">
      <article className="article">
        <h2 className="article-title">Graident Background</h2>
        <QueueAnim type="bottom" className="ui-animate flex-items-container">
          {
            numberArray.map((num) => (
              <div key={num} className={`flex-item box border-0 bg-gradient-v${num} mb-4`}> 
                <div className="box-body text-center py-7 text-body-reverse">.bg-gradient-v{num}</div>
              </div>

            ))
          }
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;