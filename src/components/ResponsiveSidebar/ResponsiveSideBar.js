import React, { Component } from "react";
import { getHeaderHeightState } from "../../store/selectors";
import { connect } from "react-redux";
import SidebarContents from "../SidebarContents";

class ResponsiveSidebar extends Component {
  render() {
    const { headerHeight, root } = this.props
    return (
      <div style={{
        position: "fixed",
        top: headerHeight + 30,
        left: 10,
        right: "80%",
        bottom: 0,
        overflow: "hidden", 
      }} >
        <div style={{
          position:"absolute", 
          left:0,
          right:10,
          top:0,
          bottom:0
        }}>
          <SidebarContents root={root}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    headerHeight: getHeaderHeightState(state),
  }
}

export default connect(mapStateToProps) (ResponsiveSidebar);