import React from 'react';
import { Card } from 'antd';

const Box = () => {
  return(
    <div className="box box-transparent">
      <div className="box-header">Customized content</div>
      <div className="box-body demo-style-card">
        <Card style={{ width: 300 }} bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example" width="100%" src="assets/images-demo/assets/400_400-3.jpg" />
          </div>
          <div className="custom-card" >
            <h4>Europe Street beat</h4>
            <p>www.instagram.com</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Box;