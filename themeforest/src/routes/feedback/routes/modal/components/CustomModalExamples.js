import React from 'react';
import { Modal, Button } from 'antd';
import FormCardLeft1 from 'routes/card/routes/form-cards/components/FormCardLeft1';
import FormCardCentered1 from 'routes/card/routes/form-cards/components/FormCardCentered1';
import TermsPage from 'routes/page/routes/terms/';

const Card = () => (
  <article className="img-card-v2 mb-4" style={{height: '400px'}}>
    <div className="img-card__cover" style={{backgroundImage: "url('assets/images-demo/covers/luca-bravo-198062-unsplash-mirror.jpg')"}}></div>
    <div className="img-card__body img-card__body--left">
      <h2 className="img-card__title">Limited Offer!</h2>
      <p className="img-card__desc lead mb-4">Hurry, take advantage of our best offer ever. Become a great designer | Enroll today & get 50% off!‎</p>
      <Button type="primary" className="btn-cta">Learn More</Button>
    </div>
  </article>
)

class Modal1 extends React.Component {
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
        <Button type="primary" onClick={this.showModal}>Modal Card</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
          centered
        >
          <Card />
        </Modal>
      </div>
    );
  }
}

class Modal2 extends React.Component {
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
        <Button type="primary" onClick={this.showModal}>Modal Form</Button>
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

class Modal3 extends React.Component {
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
        <Button type="primary" onClick={this.showModal}>Modal Form v2</Button>
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

class Modal4 extends React.Component {
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
        <Button type="primary" onClick={this.showModal}>Modal Page</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
        >
          <TermsPage />
        </Modal>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Examples</div>
      <div className="box-body">
        <div className="d-flex justify-content-around">
          <Modal1 />
          <Modal2 />
          <Modal3 />
          <Modal4 />
        </div>

        <div className="callout callout-success">
          The Modal API is both powerful and flexible, you can put almost anything in a modal
        </div>
      </div>
    </div>
  )
}

export default Box;