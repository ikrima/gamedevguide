import React from 'react'
import { connect } from 'react-redux'
import { getHeaderHeightState } from '../../store/selectors'

const Container = ({ sidebarDocked, headerHeight, onPostPage, children }) => (
  <div
    style={{
      position: 'absolute',
      top: !sidebarDocked && onPostPage ? headerHeight + 70 : headerHeight + 30,
      left: (!sidebarDocked && onPostPage) || !onPostPage ? 0 : '20%',
      right: (!sidebarDocked && onPostPage) || !onPostPage ? 0 : '15%',
      bottom: 0,
      overflow: !sidebarDocked ? 'auto' : 'visible',
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
      {children}
    </div>
  </div>
)

const mapStateToProps = state => ({
  headerHeight: getHeaderHeightState(state),
})

export default connect(mapStateToProps)(Container)
