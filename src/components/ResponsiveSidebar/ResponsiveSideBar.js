import React, { Component } from "react";
import Sidebar from "react-sidebar";
import { getSidebarState } from "../../store/selectors";
import { connect } from "react-redux";
import { onSetSidebarOpen, onSetSidebarDocked } from "../../actions/sidebar";
import MediaQuery from "react-responsive";

const styles = 
{
  root: {
    position: "absolute",
    top: 80,
    left: "80%",
    right: 10,
    bottom: 0,
    overflow: "hidden"
  },
  sidebar: {
    zIndex: 2,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  },
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
};

class ResponsiveSidebar extends Component {

  render() {
    const { sidebarOpen } = this.props.sidebar
    const { onSetSidebarDocked } = this.props
    return (
      <MediaQuery
        maxWidth={800}
        onChange={(matches) => {
          onSetSidebarDocked(!matches)
        }}
      >
        {(matches) => {
          return (
            <Sidebar
              styles={styles}
              sidebar={<b>Sidebar content</b>}
              open={sidebarOpen}
              docked={!matches}
              onSetOpen={this.onSetSidebarOpen}
              pullRight={true}
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
  return { sidebar: getSidebarState(state) }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetSidebarDocked
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveSidebar);