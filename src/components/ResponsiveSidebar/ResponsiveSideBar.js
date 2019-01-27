import React, { Component } from "react";
import { getHeaderHeightState, getSidebarDockedState, getContentOnPostPageState } from "../../store/selectors";
import { connect } from "react-redux";
import { onSetSidebarOpen, onSetSidebarDocked } from "../../actions/layout";
import MediaQuery from "react-responsive";
import { maxWidth } from './sidebar-config';
import SidebarContents from "../SidebarContents";

class ResponsiveSidebar extends Component {
  render() {
    const { onSetSidebarDocked, headerHeight, sidebarDocked, onPostPage, root } = this.props
    return (
      <MediaQuery
        maxWidth={maxWidth}
        onChange={(matches) => {
          onSetSidebarDocked(!matches)
        }}
      >
        {() => {
          if (!sidebarDocked || !onPostPage) return <></>
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
        }}
      </MediaQuery>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    headerHeight: getHeaderHeightState(state),
    sidebarDocked: getSidebarDockedState(state),
    onPostPage: getContentOnPostPageState(state),
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetSidebarDocked
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveSidebar);