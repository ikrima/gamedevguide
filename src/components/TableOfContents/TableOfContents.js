import React from 'react'
import { Anchor as AntdAnchor, Layout as AntdLayout } from 'antd'
import siteCfg from '../../../SiteCfg'

const { Link: AntdLink } = AntdAnchor
const { Sider: AntdSider } = AntdLayout

const constructTree = list => {
  const deleteNode = []
  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      if (list[i].depth + 1 === list[j].depth) {
        list[i].children.push(list[j])
        deleteNode.push(j)
      } else if (list[i].depth >= list[j].depth) break
    }
  }
  deleteNode.sort((a, b) => b - a).forEach(index => list.splice(index, 1))
}

const filterAnchorDetails = anchors => {
  let lastDepth = 0
  // eslint-disable-next-line no-param-reassign
  anchors = [].slice.call(anchors).map(anchor => {
    let depth = parseInt(anchor.parentElement.nodeName[1], 10)
    if (lastDepth !== 0 && depth > lastDepth) depth = lastDepth + 1
    lastDepth = depth
    return {
      href: `#${anchor.parentElement.id}`,
      title: anchor.parentElement.innerText,
      depth,
      children: [],
    }
  })
  constructTree(anchors)
  return anchors
}

function TableOfContents() {
  const [anchors, setAnchors] = React.useState([])

  React.useLayoutEffect(() => {
    const lclAnchors = document.getElementsByClassName('post-toc-anchor')
    setAnchors(filterAnchorDetails(lclAnchors))
  }, [])

  const loop = data =>
    data.map(item => {
      if (item.children.length > 0) {
        return (
          <AntdLink href={item.href} title={item.title} key={item.href}>
            {loop(item.children)}
          </AntdLink>
        )
      }
      return <AntdLink href={item.href} title={item.title} key={item.href} />
    })
  return (
    <AntdSider
      theme={siteCfg.theme.LightVariant}
      breakpoint={siteCfg.theme.breakpoint}
      collapsedWidth="0"
      // onBreakpoint={broken => console.log(broken)}
      // onCollapse={(collapsed, type) => console.log(collapsed, type)}
    >
      <AntdAnchor style={{ margin: '50px 50px 0px 0px' }}>{loop(anchors)}</AntdAnchor>
    </AntdSider>
  )
}

export default TableOfContents

// const filterAnchorDetails = anchors => {
//   let lastDepth = 0
//   anchors = [].slice.call(anchors).map(anchor => {
//     let depth = parseInt(anchor.parentElement.nodeName[1], 10)
//     if (lastDepth !== 0 && depth > lastDepth) depth = lastDepth + 1
//     lastDepth = depth
//     return {
//       href: `#${anchor.parentElement.id}`,
//       title: anchor.parentElement.innerText,
//       depth,
//       children: [],
//     }
//   })
//   constructTree(anchors)
//   return anchors
// }

// const constructTree = list => {
//   const deleteNode = []
//   for (let i = 0; i < list.length; i += 1) {
//     for (let j = i + 1; j < list.length; j += 1) {
//       if (list[i].depth + 1 === list[j].depth) {
//         list[i].children.push(list[j])
//         deleteNode.push(j)
//       } else if (list[i].depth >= list[j].depth) break
//     }
//   }
//   deleteNode.sort((a, b) => b - a).forEach(index => list.splice(index, 1))
// }

// class TableOfContents extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       anchors: [],
//     }
//   }

//   componentDidMount() {
//     const anchors = document.getElementsByClassName("post-toc-anchor")
//     this.setState({
//       anchors: filterAnchorDetails(anchors),
//     })
//   }

//   onSetAnchorOpen = () => {
//     this.props.onSetAnchorOpen(false)
//   }

//   render() {
//     const { anchors } = this.state
//     const { offsetTop, affix } = this.props
//     const loop = data =>
//       data.map(item => {
//         if (item.children.length > 0) {
//           return (
//             <Link href={item.href} title={item.title} key={item.href}>
//               {loop(item.children)}
//             </Link>
//           )
//         }
//         return <Link href={item.href} title={item.title} key={item.href} />
//       })
//     return (
//       <Anchor offsetTop={offsetTop} onClick={this.onSetAnchorOpen} affix={affix}>
//         {loop(anchors)}
//         {/* {(anchors.length > 1 && loop(anchors)) ||
//          (anchors.length === 1 && loop(anchors[0].children))} */}
//       </Anchor>
//     )
//   }
// }

// const mapDispatchToProps = {
//   onSetAnchorOpen,
// }

// export default connect(
//   () => ({}),
//   mapDispatchToProps
// )(TableOfContents)
