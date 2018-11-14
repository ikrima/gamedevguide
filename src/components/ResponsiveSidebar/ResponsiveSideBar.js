import React, { Component } from "react";
import Sidebar from "react-sidebar";
import { getSidebarState, getHeaderHeightState } from "../../store/selectors";
import { connect } from "react-redux";
import { onSetSidebarOpen, onSetSidebarDocked } from "../../actions/sidebar";
import MediaQuery from "react-responsive";
import { maxWidth, pullRight, styles } from './sidebar-config';
import SidebarContent from "./SidebarContent";

class ResponsiveSidebar extends Component {

  render() {
    const { sidebarOpen } = this.props.sidebar
    const { onSetSidebarDocked, headerHeight } = this.props
    return (
      <MediaQuery
        maxWidth={maxWidth}
        onChange={(matches) => {
          onSetSidebarDocked(!matches)
        }}
      >
        {(matches) => {
          return (
            <Sidebar
              styles={{
                ...styles,
                root: {
                  ...styles.root,
                  top: headerHeight + 30
                }
              }}
              sidebar={<SidebarContent/>}
              open={sidebarOpen}
              docked={!matches}
              onSetOpen={this.onSetSidebarOpen}
              pullRight={pullRight}
              shadow={false}
            >
              <b></b>
            </Sidebar>
          )
        }}
      </MediaQuery>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    sidebar: getSidebarState(state),
    headerHeight: getHeaderHeightState(state)
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetSidebarDocked
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveSidebar);