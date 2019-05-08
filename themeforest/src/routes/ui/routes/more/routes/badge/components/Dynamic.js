import React from 'react';
import { Badge, Button, Icon, Switch } from 'antd';
const ButtonGroup = Button.Group;

// Customized to fix warning

class Demo extends React.Component {
  state = {
    count: 5,
    show: true,
  }

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  }

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  }

  onChange = (show) => {
    this.setState({ show });
  }

  render() {
    return (
      <div>
        <div>
          <Badge count={this.state.count}>
            <span className="head-example"></span>
          </Badge>
          <ButtonGroup>
            <Button onClick={this.decline}>
              <Icon type="minus" />
            </Button>
            <Button onClick={this.increase}>
              <Icon type="plus" />
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ marginTop: 10 }}>
          <Badge dot={this.state.show}>
            <span className="head-example"></span>
          </Badge>
          <Switch onChange={this.onChange} checked={this.state.show} />
        </div>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Dynamic</div>
      <div className="box-body">
        <Demo />
      </div>
    </div>
  )
}

export default Box;