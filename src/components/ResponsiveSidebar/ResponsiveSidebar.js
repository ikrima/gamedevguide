import React from 'react'
import { connect } from 'react-redux'
import { getHeaderHeightState } from '../../store/selectors'
import SidebarContents from '../SidebarContents'

const ResponsiveSidebar = ({ headerHeight, root }) => (
  <div
    style={{
      position: 'fixed',
      top: headerHeight + 30,
      left: 10,
      right: '80%',
      bottom: 0,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 10,
        top: 0,
        bottom: 0,
      }}
    >
      <SidebarContents root={root} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  headerHeight: getHeaderHeightState(state),
})

export default connect(mapStateToProps)(ResponsiveSidebar)
