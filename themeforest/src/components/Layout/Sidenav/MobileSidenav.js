import React from 'react';
import { connect } from 'react-redux';
import MobileSidenavSider from './MobileSidenavSider';
import { Drawer } from 'antd';
import { toggleOffCanvasMobileNav } from 'actions/settingsActions';

class AppSidenav extends React.Component {

  render() {
    const {  offCanvasMobileNav, handleToggleOffCanvasMobileNav, sidenavWidth } = this.props;

    return (
      <Drawer
        closable={false}
        visible={!offCanvasMobileNav}
        placement="left"
        className="d-md-none app-drawer"
        width={sidenavWidth}
        onClose={() => {
          handleToggleOffCanvasMobileNav(true);
        }}
      >
        <MobileSidenavSider />
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => ({
  offCanvasMobileNav: state.settings.offCanvasMobileNav,
  sidenavWidth: state.settings.sidenavWidth,
});

const mapDispatchToProps = dispatch => ({
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch( toggleOffCanvasMobileNav(isOffCanvasMobileNav) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidenav);