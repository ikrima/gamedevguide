import React from 'react';
import { Modal, Button } from 'antd';
import FormCardLeft1 from 'routes/card/routes/form-cards/components/FormCardLeft1';
import FormCardRight1 from 'routes/card/routes/form-cards/components/FormCardRight1';
import FormCardCentered1 from 'routes/card/routes/form-cards/components/FormCardCentered1';

class FormModal1 extends React.Component {
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
        <Button onClick={this.showModal}>Open a modal form v1</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
        >
          <FormCardLeft1 />
        </Modal>
      </div>
    );
  }
}

class FormModal2 extends React.Component {
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
        <Button onClick={this.showModal}>Open a modal form v2</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
        >
          <FormCardRight1 />
        </Modal>
      </div>
    );
  }
}

class FormModal3 extends React.Component {
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
        <Button onClick={this.showModal}>Open a modal form v3</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
        >
          <FormCardCentered1 />
        </Modal>
      </div>
    );
  }
}

const Section = () => (
  <article className="article">
    <h2 className="article-title">Modal Form</h2>
    <div className="box box-default">
      <div className="box-body d-flex justify-content-around py-5">
        <FormModal1 />
        <FormModal2 />
        <FormModal3 />
      </div>
    </div>
  </article>
)

export default Section;