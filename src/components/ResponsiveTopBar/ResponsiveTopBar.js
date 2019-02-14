import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { getHeaderHeightState, getSidebarState, getAnchorState } from '../../store/selectors';
import { onSetAnchorOpen, onSetSidebarOpen } from '../../actions/layout'
import SidebarContents from '../SidebarContents';
import TableOfContents from '../TableOfContents';

class ResponsiveTopBar extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(true)
  }

  onSetSidebarClose = () => {
    this.props.onSetSidebarOpen(false)
  }

  onSetAnchorOpen = () => {
    this.props.onSetAnchorOpen(true)
  }

  onSetAnchorClose = () => {
    this.props.onSetAnchorOpen(false)
  }

  render() {
    const { headerHeight, sidebarOpen, anchorOpen, root } = this.props

    return (
      <div
        style={{
          position: "fixed",
          top: headerHeight,
          width: "100%",
          height: 40,
          zIndex: 1001,
          background: 'aliceblue',
          marginBottom: '1.45rem'
        }}
      >
        {!anchorOpen &&
          <div style={{
            position: "absolute",
            left: 8,
            top: 4
          }}>
            {sidebarOpen ? 
              <Button icon="close" onClick={this.onSetSidebarClose}/> :
              <Button icon="bars" onClick={this.onSetSidebarOpen}/>
            }
            {sidebarOpen &&
              <div style={{
                position: "fixed",
                top: headerHeight + 40,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white'
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                  transition: "left .3s ease-out, right .3s ease-out",
                }}>
                  <SidebarContents root={root}/>
                </div>
              </div>
            }
          </div>
        }
        {!sidebarOpen &&
          <div style={{
            position: "absolute",
            right: 8,
            top: 4
          }}>
            {anchorOpen ?
              <Button icon="close" onClick={this.onSetAnchorClose}/> :
              <Button icon="ellipsis" onClick={this.onSetAnchorOpen}/>
            }
              {anchorOpen &&
              <div style={{
                position: "fixed",
                top: headerHeight + 40,
                left: 0,
                right: 10,
                bottom: 0,
                zIndex: 1000,
                overflowY: "auto",
                backgroundColor: 'white',
                WebkitOverflowScrolling: "touch",
                transition: "left .3s ease-out, right .3s ease-out",
              }}>
                <TableOfContents offsetTop={headerHeight+70} affix={false}/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headerHeight: getHeaderHeightState(state),
    sidebarOpen: getSidebarState(state).open,
    anchorOpen: getAnchorState(state).open,
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetAnchorOpen
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveTopBar)