import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { toggleCollapsedNav, toggleOffCanvasNav } from 'actions/settingsActions';
import AppMenu from './Menu'
const { Sider } = Layout;

// Same with Sidenav
// Removed sidenav header and footer

class AppSidenav extends React.Component {
  render() {
    const { collapsedNav, offCanvasNav, sidenavWidth, colorOption } = this.props;
    const collapsedWidth = offCanvasNav ? 0 : 80;

    return (
      <Sider
        collapsible
        collapsed={collapsedNav || offCanvasNav}
        collapsedWidth={collapsedWidth}
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames('app-sidenav d-none d-md-flex', {
          'sidenav-bg-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
          'sidenav-bg-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0 })}
      >
        <div className="sidenav-content" ref="sidenavContent">
          <AppMenu />
        </div>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  collapsedNav: state.settings.collapsedNav,
  offCanvasNav: state.settings.offCanvasNav,
  sidenavWidth: state.settings.sidenavWidth,
  colorOption: state.settings.colorOption
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleCollapsedNav: (isCollapsedNav) => {
      dispatch( toggleCollapsedNav(isCollapsedNav) );
    },
    handleToggleOffCanvasNav: (isOffCanvasNav) => {
      dispatch( toggleOffCanvasNav(isOffCanvasNav) );
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidenav);
