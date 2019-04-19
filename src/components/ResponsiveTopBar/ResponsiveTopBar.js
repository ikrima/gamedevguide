import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { getHeaderHeightState, getSidebarState, getAnchorState } from '../../store/selectors'
import { onSetAnchorOpen, onSetSidebarOpen } from '../../actions/layout'
import SidebarContents from '../SidebarContents'
import TableOfContents from '../TableOfContents'

const ResponsiveTopBar = ({
  inOnSetSidebarOpen,
  inOnSetAnchorOpen,
  headerHeight,
  sidebarOpen,
  anchorOpen,
  root,
}) => {
  const lclOnSetSidebarOpen = () => {
    inOnSetSidebarOpen(true)
  }

  const lclOnSetSidebarClose = () => {
    inOnSetSidebarOpen(false)
  }

  const lclOnSetAnchorOpen = () => {
    inOnSetAnchorOpen(true)
  }

  const lclOnSetAnchorClose = () => {
    inOnSetAnchorOpen(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: headerHeight,
        width: '100%',
        height: 40,
        zIndex: 1001,
        background: 'aliceblue',
        marginBottom: '1.45rem',
      }}
    >
      {!anchorOpen && (
        <div
          style={{
            position: 'absolute',
            left: 8,
            top: 4,
          }}
        >
          {sidebarOpen ? (
            <Button icon="close" onClick={lclOnSetSidebarClose} />
          ) : (
            <Button icon="bars" onClick={lclOnSetSidebarOpen} />
          )}
          {sidebarOpen && (
            <div
              style={{
                position: 'fixed',
                top: headerHeight + 40,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  transition: 'left .3s ease-out, right .3s ease-out',
                }}
              >
                <SidebarContents root={root} />
              </div>
            </div>
          )}
        </div>
      )}
      {!sidebarOpen && (
        <div
          style={{
            position: 'absolute',
            right: 8,
            top: 4,
          }}
        >
          {anchorOpen ? (
            <Button icon="close" onClick={lclOnSetAnchorClose} />
          ) : (
            <Button icon="ellipsis" onClick={lclOnSetAnchorOpen} />
          )}
          {anchorOpen && (
            <div
              style={{
                position: 'fixed',
                top: headerHeight + 40,
                left: 0,
                right: 10,
                bottom: 0,
                zIndex: 1000,
                overflowY: 'auto',
                backgroundColor: 'white',
                WebkitOverflowScrolling: 'touch',
                transition: 'left .3s ease-out, right .3s ease-out',
              }}
            >
              <TableOfContents offsetTop={headerHeight + 70} affix={false} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  headerHeight: getHeaderHeightState(state),
  sidebarOpen: getSidebarState(state).open,
  anchorOpen: getAnchorState(state).open,
})

const mapDispatchToProps = {
  onSetSidebarOpen,
  onSetAnchorOpen,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveTopBar)
