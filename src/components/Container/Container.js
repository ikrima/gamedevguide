import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSidebarDockedState } from '../../store/selectors';
import { pullRight } from '../ResponsiveSidebar/sidebar-config';

class Container extends Component {
  render() {
    const { sidebarDocked } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          top: 100,
          left: (sidebarDocked && !pullRight) ? "20%" : 0,
          right: (sidebarDocked && pullRight) ? "20%" : 0,
          bottom: 0,
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
  return { sidebarDocked: getSidebarDockedState(state) }
}

export default connect(mapStateToProps) (Container);