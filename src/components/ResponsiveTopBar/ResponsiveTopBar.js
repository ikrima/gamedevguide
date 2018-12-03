import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { getHeaderHeightState, getSidebarDockedState } from '../../store/selectors';

class ResponsiveTopBar extends Component {
  render() {
    const { headerHeight, siderbarDocked } = this.props
    if (siderbarDocked) return <></>
    return (
      <div
        style={{
          position: "fixed",
          top: headerHeight,
          width: "100%",
          height: 40,
          zIndex: 1000,
          background: 'aliceblue',
          marginBottom: '1.45rem'
        }}
      >
        <div style={{
          position: "absolute",
          left: 8,
          top: 4
        }}>
          <Button icon="fullscreen"/>
        </div>
        <div style={{
          position: "absolute",
          right: 8,
          top: 4
        }}>
          <Button icon="dash"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headerHeight: getHeaderHeightState(state),
    siderbarDocked: getSidebarDockedState(state)
  }
}

export default connect(mapStateToProps) (ResponsiveTopBar)