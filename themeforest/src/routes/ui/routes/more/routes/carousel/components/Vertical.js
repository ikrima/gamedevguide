import React from 'react';
import { Carousel } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Vertical</div>
      <div className="box-body">
        <Carousel vertical>
          <div><img className="w-100 rounded" src="assets/images-demo/assets/600_400-3.jpg" alt="carousel img"/></div>
          <div><img className="w-100 rounded" src="assets/images-demo/assets/600_400-4.jpg" alt="carousel img"/></div>
          <div><img className="w-100 rounded" src="assets/images-demo/assets/600_400-1.jpg" alt="carousel img"/></div>
          <div><img className="w-100 rounded" src="assets/images-demo/assets/600_400-2.jpg" alt="carousel img"/></div>
        </Carousel>
      </div>
    </div>
  )
}

export default Box;