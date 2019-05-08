import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import APPCONFIG from 'constants/appConfig';
import DEMO from 'constants/demoData';
import { toggleOffCanvasMobileNav } from 'actions/settingsActions';
import { CARDS, LAYOUTS, UIKIT, FORMS, FEEDBACKS, TABELS, CHARTS, PAGES, ECOMMERCE, USER, EXCEPTION } from 'constants/uiComponents';

const SubMenu = Menu.SubMenu;

class AppMenu extends React.Component {

  // list for AccordionNav
  rootMenuItemKeys= [ // without submenu
    '/app/dashboard',
    '/app/ui-overview',
    '/app/calendar',
  ]
  rootSubmenuKeys = [
    '/app/card',
    '/app/layout',
    '/app/ui',
    '/app/form',
    '/app/feedback',
    '/app/table',
    '/app/chart',
    '/app/page',
    '/app/ecommerce',
    '/user',
    '/exception',
    '/app/menu'
  ];

  state = {
    openKeys: ['/app/dashboard'],
  };

  onOpenChange = (openKeys) => {

    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  onMenuItemClick = (item) => {
    // AccordionNav
    const itemKey = item.key;
    if(this.rootMenuItemKeys.indexOf(itemKey) >= 0) {
      this.setState({ openKeys: [itemKey] });
    }

    //
    const { isMobileNav } = this.props;
    if (isMobileNav) {
      this.closeMobileSidenav();
    }
  }

  closeMobileSidenav = () => {
    if (APPCONFIG.AutoCloseMobileNav) {
      const { handleToggleOffCanvasMobileNav } = this.props;
      handleToggleOffCanvasMobileNav(true);
    }
  }

  //
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // hide submenu if there's no children items
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={item.name}
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}><Link to={item.path}><span>{item.menuName || item.name}</span></Link></Menu.Item>;
    }
  };

  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  }


  render() {
    const { collapsedNav, colorOption, location } = this.props;
    // const mode = collapsedNav ? 'vertical' : 'inline';
    const menuTheme = ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0 ? 'light' : 'dark';
    const currentPathname = location.pathname;

    const menuProps = collapsedNav
      ? {}
      : {
          openKeys: this.state.openKeys
        };

    return (
      <Menu
        theme={menuTheme}
        mode="inline"
        inlineCollapsed={collapsedNav}
        {...menuProps}
        onOpenChange={this.onOpenChange}
        onClick={this.onMenuItemClick}
        selectedKeys={[currentPathname]}
      >
        <Menu.Item key="/app/dashboard">
          <a href="#/app/dashboard">
            <Icon type="dashboard" />
            <span className="nav-text">Dashboard</span>
          </a>
        </Menu.Item>
        <Menu.Item key="/app/ui-overview">
          <a href="#/app/ui-overview">
            <Icon type="shop" />
            <span className="nav-text">UI Overview</span>
            <span className="nav-badge badge-right badge badge-pill badge-info ml-1">100+</span>
          </a>
        </Menu.Item>
        <SubMenu
          key="/app/card"
          title={<span><Icon type="credit-card" /><span className="nav-text">Cards</span></span>}
        >
          { this.getNavMenuItems(CARDS) }
        </SubMenu>
        <SubMenu
          key="/app/layout"
          title={<span><Icon type="layout" /><span className="nav-text">Layouts</span></span>}
        >
          { this.getNavMenuItems(LAYOUTS) }
        </SubMenu>
        <SubMenu
          key="/app/ui"
          title={<span><Icon type="appstore-o" /><span className="nav-text">UI Kit</span></span>}
        >
          { this.getNavMenuItems(UIKIT) }
        </SubMenu>
        <SubMenu
          key="/app/form"
          title={<span><Icon type="form" /><span className="nav-text">Forms</span></span>}
        >
          { this.getNavMenuItems(FORMS) }
        </SubMenu>
        <SubMenu
          key="/app/feedback"
          title={<span><Icon type="notification" /><span className="nav-text">Feedbacks</span></span>}
        >
          { this.getNavMenuItems(FEEDBACKS) }
        </SubMenu>
        <SubMenu
          key="/app/table"
          title={<span><Icon type="table" /><span className="nav-text">Tables</span></span>}
        >
          { this.getNavMenuItems(TABELS) }
        </SubMenu>
        <SubMenu
          key="/app/chart"
          title={<span><Icon type="line-chart" /><span className="nav-text">Charts</span></span>}
        >
          { this.getNavMenuItems(CHARTS) }
        </SubMenu>
        <Menu.Item key="/app/calendar">
          <a href="#/app/calendar">
            <Icon type="calendar" />
            <span className="nav-text">Calendar</span>
          </a>
        </Menu.Item>
        <Menu.Divider />
        <SubMenu
          key="/app/page"
          title={<span><Icon type="file" /><span className="nav-text">Pages</span></span>}
        >
          { this.getNavMenuItems(PAGES) }
        </SubMenu>
        <SubMenu
          key="/app/ecommerce"
          title={<span><Icon type="shopping-cart" /><span className="nav-text">eCommerce</span></span>}
        >
          { this.getNavMenuItems(ECOMMERCE) }
        </SubMenu>
        <SubMenu
          key="/user"
          title={<span><Icon type="user" /><span className="nav-text">Account</span></span>}
        >
          { this.getNavMenuItems(USER) }
        </SubMenu>
        <SubMenu
          key="/exception"
          title={<span><Icon type="exclamation-circle-o" /><span className="nav-text">Exception</span></span>}
        >
          { this.getNavMenuItems(EXCEPTION) }
        </SubMenu>
        <Menu.Divider />
        <SubMenu
          key="/app/menu"
          title={<span><Icon type="plus" /><span className="nav-text">Menu Levels</span></span>}
        >
          <Menu.Item key="level21"><a href={DEMO.link}><span>Level 2</span></a></Menu.Item>
          <SubMenu
            key="level22"
            title={<span>Level 2</span>}
          >
            <Menu.Item key="level31"><a href={DEMO.link}><span>Level 3</span></a></Menu.Item>
            <SubMenu
              key="level32"
              title={<span>Level 3</span>}
            >
              <Menu.Item key="level41"><a href={DEMO.link}><span>Level 4</span></a></Menu.Item>
              <Menu.Item key="level42"><a href={DEMO.link}><span>Level 4</span></a></Menu.Item>
            </SubMenu>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="/app/landing">
          <a href="http://iarouse.com/dist-react-ant-design/landing/" target="_blank" rel="noopener noreferrer">
            <Icon type="link" />
            <span className="nav-text">Landing Page</span>
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return ({
    collapsedNav: state.settings.collapsedNav,
    colorOption: state.settings.colorOption,
    location: state.routing.location
  })
};

const mapDispatchToProps = dispatch => ({
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch( toggleOffCanvasMobileNav(isOffCanvasMobileNav) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu);
