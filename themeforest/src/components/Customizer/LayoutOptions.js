import React from 'react';
import { connect } from 'react-redux';
import { Popover, Tooltip, Switch, Slider, Radio, Icon } from 'antd';
import { 
  changeLayout,
  toggleBoxedLayout,
  toggleFixedSidenav,
  toggleFixedHeader,
  toggleCollapsedNav,
  toggleOffCanvasNav,
  changeSidenavWidth 
} from 'actions/settingsActions';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class LayoutOptions extends React.Component {

  onLayoutChange = (e) => {
    const { handleLayoutChange } = this.props;
    const newLayoutOption = e.target.value;
    handleLayoutChange(newLayoutOption);
  }

  onToggleBoxedLayout = (isChecked) => {
    const { handleToggleBoxedLayout } = this.props;
    handleToggleBoxedLayout(isChecked);
  }

  onToggleFixedSidenav = (isChecked) => {
    const { handleToggleFixedSidenav } = this.props;
    handleToggleFixedSidenav(isChecked);
  }

  onToggleFixedHeader = (isChecked) => {
    const { handleToggleFixedHeader } = this.props;
    handleToggleFixedHeader(isChecked);
  }

  onToggleCollapsedNav = (isChecked) => {
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(isChecked);
  }

  onToggleOffCanvasNav = (isChecked) => {
    const { handleToggleOffCanvasNav } = this.props;
    handleToggleOffCanvasNav(isChecked);
  }

  onSidenavWidthChange = (val) => {
    const { handleSidenavWidthChange } = this.props;
    handleSidenavWidthChange(val);
  }

  render() {
    const { layout, boxedLayout, fixedSidenav, fixedHeader, collapsedNav, offCanvasNav, sidenavWidth } = this.props;

    return (
      <section>
        <h4 className="section-header">Layout Options</h4>
        <div className="divider" />

        <div className="row m-0 layout-options clearfix">
          <RadioGroup onChange={this.onLayoutChange}>
            <RadioButton value="1" checked={layout === '1'}>
              <Tooltip title="Default App layout"><span className="layout-opition">1</span></Tooltip>
            </RadioButton>
            <RadioButton value="2" checked={layout === '2'}>
              <Tooltip title="App v2 layout"><span className="layout-opition">2</span></Tooltip>
            </RadioButton>
            <RadioButton value="3" checked={layout === '3'}>
              <Tooltip title="Header-Content-Footer layout"><span className="layout-opition">3</span></Tooltip>
            </RadioButton>
            <RadioButton value="4" checked={layout === '4'}>
              <Tooltip title="Content Only (Fullscreen page)"><span className="layout-opition">4</span></Tooltip>
            </RadioButton>
            <RadioButton value="custom">
              <Popover content="Building custom layouts is quite easy!" title="Your Own" trigger="hover"><span className="layout-opition">Custom</span></Popover>
            </RadioButton>
          </RadioGroup>
        </div>

        <div className="divider" />

        <div className="layout-setting-item">
          Fixed Sidenav
          <Switch checked={fixedSidenav} onChange={this.onToggleFixedSidenav} disabled={['2','3', '4'].indexOf(layout) >= 0} />
        </div>
        <div className="layout-setting-item">
          <Tooltip title='In layout "1", Fixed Header can only be activated when Fixed Sidenav is activated'><span className="text-dotted">Fixed Header <Icon type="exclamation-circle" theme="filled" /></span></Tooltip>
          <Switch checked={fixedSidenav && fixedHeader} onChange={this.onToggleFixedHeader} disabled={['2','3', '4'].indexOf(layout) >= 0} />
        </div>
        <div className="layout-setting-item">
          Boxed Layout
          <Switch checked={boxedLayout} onChange={this.onToggleBoxedLayout} />
        </div>
        <div className="layout-setting-item">
          Collapsed Sidenav
          <Switch checked={collapsedNav} onChange={this.onToggleCollapsedNav} disabled={['3','4'].indexOf(layout) >= 0} />
        </div>
        <div className="layout-setting-item">
          Off-Canvas Sidenav
          <Switch checked={offCanvasNav} onChange={this.onToggleOffCanvasNav} disabled={['3','4'].indexOf(layout) >= 0} />
        </div>

        <div className="row layout-setting-item-slider">
          <div className="col-4">Sidenav Width</div>
          <div className="col-8">
            <Slider
              min={180}
              max={300}
              onChange={this.onSidenavWidthChange}
              value={sidenavWidth}
              tipFormatter={ (value) => {return `${value}px`;} }
              disabled={['3','4'].indexOf(layout) >= 0}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  layout: state.settings.layout,
  boxedLayout: state.settings.boxedLayout,
  fixedSidenav: state.settings.fixedSidenav,
  fixedHeader: state.settings.fixedHeader,
  collapsedNav: state.settings.collapsedNav,
  offCanvasNav: state.settings.offCanvasNav,
  sidenavWidth: state.settings.sidenavWidth,
});

const mapDispatchToProps = dispatch => ({
  handleLayoutChange: (layoutOption) => {
    dispatch(changeLayout(layoutOption));
  },
  handleToggleBoxedLayout: (isBoxedLayout) => {
    dispatch( toggleBoxedLayout(isBoxedLayout) );
  },
  handleToggleFixedSidenav: (isFixedSidenav) => {
    dispatch( toggleFixedSidenav(isFixedSidenav) );
  },
  handleToggleFixedHeader: (isFixedHeader) => {
    dispatch( toggleFixedHeader(isFixedHeader) );
  },
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch( toggleCollapsedNav(isCollapsedNav) );
  },
  handleToggleOffCanvasNav: (isOffCanvasNav) => {
    dispatch( toggleOffCanvasNav(isOffCanvasNav) );
  },
  handleSidenavWidthChange: (sidenavWidth) => {
    dispatch( changeSidenavWidth(sidenavWidth) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutOptions);
