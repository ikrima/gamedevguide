import React, { Component } from 'react'
import TableOfContents from './TableOfContents';

class ResponsiveAnchor extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: 100,
          left: "85%",
          right: 10,
          bottom: 0,
          overflow: "hidden"
        }}
      >
        <TableOfContents />
      </div>
    )
  }
}

export default ResponsiveAnchor