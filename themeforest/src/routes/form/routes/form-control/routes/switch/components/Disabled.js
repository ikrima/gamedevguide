import React from 'react';
import { Switch, Button } from 'antd';

class App extends React.Component {
  state = {
    disabled: true,
  }
  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} />
        <br />
        <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Disabled</div>
      <div className="box-body">
        <App />
      </div>
    </div>
  )
}

export default Box;