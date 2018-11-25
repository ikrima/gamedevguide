import React, { Component } from 'react'
import TableOfContents from './TableOfContents';
import { getAnchorState } from '../../store/selectors';
import { onSetAnchorDocked } from '../../actions/anchor'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { styles, maxWidth } from './anchor-config'

class ResponsiveAnchor extends Component {
  render() {
    const { onSetAnchorDocked } = this.props
    return (
      <MediaQuery
        maxWidth={maxWidth}
        onChange={(matches) => {
          onSetAnchorDocked(!matches)
        }}
      >
        {(matches) => ((!matches && 
          <div style={styles} >
            <TableOfContents />
          </div>)
        )}
      </MediaQuery>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anchor: getAnchorState(state)
  }
}

const mapDispatchToProps = {
  onSetAnchorDocked
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveAnchor)