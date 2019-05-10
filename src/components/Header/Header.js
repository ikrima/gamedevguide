import React from 'react';
// import { Link } from 'gatsby';
// import sizeMe  from 'react-sizeme';
// import { connect } from "react-redux";
// import { updateHeaderHeight } from '../../actions/layout';
import { Layout as AntdLayout } from 'antd';
import Menu from '../Menu';

const { Header: AntdHeader } = AntdLayout;

const Header = ({ siteNavTitle }) => (
  <AntdHeader>
    <Menu siteNavTitle={siteNavTitle} />
  </AntdHeader>
);
// const mapDispatchToProps = {
//  updateHeaderHeight
// }

// export default connect(()=>({}), mapDispatchToProps) (sizeMe({monitorHeight: true})(Header))
export default Header;
