import React from 'react';
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}>Open a modal dialog</Button>
        <Modal 
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
        >
          <p>This modal is centered vertically.</p>
          <p>You can use CSS to customize the position of modal</p>
        </Modal>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Vertically Centered</div>
      <div className="box-body">
        <App />
      </div>
    </div>
  )
}

export default Box;