import React from 'react';
import { Modal, Button } from 'antd';

// customized

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: 'A short message',
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: 'This is a success message',
    content: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    ),
  });
}

function error() {
  Modal.error({
    title: 'This is an error message',
    content: 'A short message',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    )
  });
}


const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Information modal dialog</div>
      <div className="box-body">
        <Button onClick={info}>Info</Button>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
      </div>
    </div>
  )
}

export default Box;