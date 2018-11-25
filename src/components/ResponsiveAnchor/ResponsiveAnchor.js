import React, { Component } from 'react'
import TableOfContents from './TableOfContents';
import { onSetAnchorDocked } from '../../actions/anchor'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { styles, maxWidth } from './anchor-config'
import { getHeaderHeightState } from "../../store/selectors";

class ResponsiveAnchor extends Component {
  render() {
    const { onSetAnchorDocked, headerHeight } = this.props
    return (
      <MediaQuery
        maxWidth={maxWidth}
        onChange={(matches) => {
          onSetAnchorDocked(!matches)
        }}
      >
        {(matches) => ((!matches && 
          <div style={{
            ...styles,
            top: headerHeight + 30
          }} >
            <TableOfContents offsetTop={headerHeight+30}/>
          </div>)
        )}
      </MediaQuery>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    headerHeight: getHeaderHeightState(state)
  }
}

const mapDispatchToProps = {
  onSetAnchorDocked
}

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveAnchor)