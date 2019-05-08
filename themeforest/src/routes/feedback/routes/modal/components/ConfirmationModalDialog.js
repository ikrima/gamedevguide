import React from 'react';
import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'Want to delete these items?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Confirmation modal dialog</div>
      <div className="box-body">
        <Button onClick={showConfirm}>
          Confirmation modal dialog
        </Button>
      </div>
    </div>
  )
}

export default Box;