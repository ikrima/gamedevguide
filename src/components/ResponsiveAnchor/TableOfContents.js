import React, { Component } from 'react'
import Anchor from 'antd/lib/anchor'
import 'antd/lib/anchor/style/css'

const { Link } = Anchor

class TableOfContents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchors: []
    }
  }

  componentDidMount() {
    let anchors = document.getElementsByClassName('post-toc-anchor')
    anchors = [].slice.call(anchors).map(anchor => {
      return ({
        href: "#"+ anchor.parentElement.id,
        title: anchor.parentElement.innerText,
        depth: anchor.parentElement.nodeName[1],
      })
    })
    this.setState({
      anchors: anchors
    })
  }
  render() {
    const { anchors } = this.state
    return (
      <Anchor offsetTop={102} >
        {anchors.map(anchor => <Link href={anchor.href} title={anchor.title} key={anchor.href}/>)}
      </Anchor>
    )
  }
}

export default TableOfContents