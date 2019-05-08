import React from 'react';
import { Button, Radio } from 'antd';

class ButtonSize extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div className="box-body">
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br /><br />
        <Button type="primary" size={size}>Primary</Button>
        <Button size={size}>Normal</Button>
        <Button type="dashed" size={size}>Dashed</Button>
        <Button type="danger" size={size}>Danger</Button>
        <br />
        <Button type="primary" shape="circle" icon="download" size={size} />
        <Button type="primary" icon="download" size={size}>Download</Button>
        <Button type="primary" size={size}>Normal</Button>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Size</div>
      <ButtonSize />
    </div>
  )
}

export default Box;