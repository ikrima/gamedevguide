import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSidebarDockedState, getHeaderHeightState, getContentOnPostPageState } from '../../store/selectors';

class Container extends Component {
  render() {
    const {
      sidebarDocked, 
      headerHeight, 
      onPostPage, 
    } = this.props;

    return (
      <div
        style={{
          position: "absolute",
          top: (sidebarDocked || !onPostPage) ? headerHeight + 30: headerHeight + 70,
          left: (sidebarDocked) ? "20%" : 0,
          right: (sidebarDocked) ? "15%" : 0,
          bottom: 0,
          overflow: !sidebarDocked ? "auto" : "visible",
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    sidebarDocked: getSidebarDockedState(state),
    headerHeight: getHeaderHeightState(state),
    onPostPage: getContentOnPostPageState(state),
  }
}

export default connect(mapStateToProps) (Container);