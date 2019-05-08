import React from 'react';
import { Popover, Button } from 'antd';
import DEMO from 'constants/demoData';

// Customized to fix warning

class App extends React.Component {
  state = {
    visible: false,
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  render() {
    return (
      <Popover
        content={<a href={DEMO.link} onClick={this.hide}>Close</a>}
        title="Title"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button type="primary">Click me</Button>
      </Popover>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Controlling the close of the dialog</div>
      <div className="box-body">
        <App />
      </div>
    </div>
  )
}

export default Box;