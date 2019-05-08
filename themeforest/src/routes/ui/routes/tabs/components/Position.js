import React from 'react';
import { Tabs, Select } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


class Demo extends React.Component {
  state = {
    tabPosition: 'top',
  }
  changeTabPosition = (tabPosition) => {
    this.setState({ tabPosition });
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          Tab position：
          <Select
            value={this.state.tabPosition}
            onChange={this.changeTabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
        </Tabs>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Position</div>
      <div className="box-body">
        <Demo />
      </div>
    </div>
  )
}

export default Box;