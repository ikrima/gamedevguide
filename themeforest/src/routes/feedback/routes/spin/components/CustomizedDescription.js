import React from 'react';
import { Spin, Alert } from 'antd';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customized description</div>
      <div className="box-body">
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      </div>
    </div>
  )
}

export default Box;