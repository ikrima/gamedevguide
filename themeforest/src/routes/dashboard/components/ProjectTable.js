import React from 'react';
import { Table } from 'antd';
import styles from './style.module.scss';

const columns = [{
  title: '#',
  dataIndex: 'number',
}, {
  title: 'Project',
  dataIndex: 'project',
}, {
  title: 'Status',
  dataIndex: 'status',
  render: (text, row, index) => {
    const tag = text.split('-');
    const status = tag[0];
    const type = tag[1] ? 'ant-tag-type-' + tag[1] : 'ant-tag-type-primary';
    const tagClasses = 'ant-tag ant-tag-has-color ' + type;
    return (
      <div data-show="true" className={tagClasses}>
        <span className="ant-tag-text">{status}</span>
      </div>
    )
  }
}, {
  title: 'Manager',
  dataIndex: 'manager',
}, {
  title: 'Progress',
  dataIndex: 'progress',
  render: (text, row, index) => {
    const progress = text.split('-');
    const percent = progress[0];
    const type = progress[1] ? 'ant-progress-type-' + progress[1] : 'ant-progress-type-primary';
    const progressClasses = 'ant-progress ant-progress-line ' + type;
    return (
      <div className={progressClasses}>
        <div>
          <div className="ant-progress-outer">
            <div className="ant-progress-inner">
              <div className="ant-progress-bg" style={{width: percent, height: '10px'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}];

const data = [{
  key: '1',
  number: '1',
  project:' TWLT',
  status: 'Pending-info',
  manager: 'Amery Lee',
  progress: '55%'
}, {
  key: '2',
  number: '2',
  project:'A16Z',
  status: 'Due',
  manager: 'Romayne Carlyn',
  progress: '35%-success'
}, {
  key: '3',
  number: '3',
  project:'DARK',
  status: 'Due-success',
  manager: 'Jane Swift',
  progress: '68%-info'
}, {
  key: '4',
  number: '4',
  project:'Q300',
  status: 'Blocked-danger',
  manager: 'Marybeth Joanna',
  progress: '52%-warning'
}, {
  key: '5',
  number: '5',
  project:'RVNG',
  status: 'Suspended-warning',
  manager: 'Jonah Benny',
  progress: '77%-danger'
}, {
  key: '6',
  number: '6',
  project:'FDSA',
  status: 'Suspended-info',
  manager: 'Daly Royle',
  progress: '55%-success'
}];


const Box = () => (
  <Table
    className={`${styles.project_table} mb-4`}
    columns={columns}
    dataSource={data}
    pagination={false}
    bordered={false}
  />
)

export default Box;
