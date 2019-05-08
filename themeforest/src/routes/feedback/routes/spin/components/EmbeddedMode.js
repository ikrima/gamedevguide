import React from 'react';
import { Spin, Switch, Alert } from 'antd';

class Card extends React.Component {
  state = { loading: false }
  toggle = (value) => {
    this.setState({ loading: value });
  }
  render() {
    const container = (
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    );
    return (
      <div>
        <Spin spinning={this.state.loading}>{container}</Spin>
        Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
      </div>
    );
  }
}


const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Embedded mode</div>
      <div className="box-body">
        <Card />
      </div>
    </div>
  )
}

export default Box;