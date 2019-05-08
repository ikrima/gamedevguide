import React from 'react';
import { Radio, Button } from 'antd';

class App extends React.Component {
  state = {
    disabled: true,
  }
  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  render() {
    return (
      <div>
        <Radio defaultChecked={false} disabled={this.state.disabled}>Disabled</Radio>
        <br />
        <Radio defaultChecked disabled={this.state.disabled}>Disabled</Radio>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={this.toggleDisabled}>
            Toggle disabled
          </Button>
        </div>
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