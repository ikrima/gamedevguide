import React from 'react'
import { connect } from 'react-redux'
import TableOfContents from '../TableOfContents'
import { getHeaderHeightState } from '../../store/selectors'

const ResponsiveAnchor = ({ headerHeight }) => (
  <div
    style={{
      position: 'fixed',
      top: headerHeight + 30,
      left: '85%',
      right: 10,
      bottom: 0,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <TableOfContents offsetTop={headerHeight + 30} affix />
    </div>
  </div>
)

const mapStateToProps = state => ({
  headerHeight: getHeaderHeightState(state),
})

export default connect(mapStateToProps)(ResponsiveAnchor)
