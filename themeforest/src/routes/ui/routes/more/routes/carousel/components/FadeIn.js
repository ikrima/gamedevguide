import React from 'react';
import { Carousel } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Fade in</div>
      <div className="box-body">
        <Carousel effect="fade">
          <div><img className="rounded" src="assets/images-demo/assets/600_400-2.jpg" alt="carousel img"/></div>
          <div><img className="rounded" src="assets/images-demo/assets/600_400-3.jpg" alt="carousel img"/></div>
          <div><img className="rounded" src="assets/images-demo/assets/600_400-4.jpg" alt="carousel img"/></div>
          <div><img className="rounded" src="assets/images-demo/assets/600_400-1.jpg" alt="carousel img"/></div>
        </Carousel>
      </div>
    </div>
  )
}

export default Box;