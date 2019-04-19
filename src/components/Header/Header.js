import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe  from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
import Menu from '../Menu';

import { Layout as AntdLayout } from 'antd'
const { Header: AntdHeader } = AntdLayout


class Header extends Component {
  //componentDidUpdate = () => {
  //  this.props.updateHeaderHeight(this.props.size.height)
  //}

  render() {
    const { siteNavTitle } = this.props
    return (
      <AntdHeader>
        <Menu siteNavTitle={siteNavTitle} />
      </AntdHeader>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

//export default connect(()=>({}), mapDispatchToProps) (sizeMe({monitorHeight: true})(Header))
export default Header