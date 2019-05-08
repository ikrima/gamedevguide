let date = new Date();
let year = date.getFullYear();

const APPCONFIG = {
  brand: 'Ant',
  year: year,
  AutoCloseMobileNav: true, // Boolean: true, false. Automatically close sidenav on route change (Mobile only)
  customizer: false, // Boolean: true, false. Customizer will be removed completely when set to false
  showCustomizer: false, // Boolean: true, false. Customizer will be opened (visible) first time app was loaded if set to true
  color: {
    primary: '#1890ff',
    success: '#66BB6A',
    info: '#01BCD4',
    infoAlt: '#948aec',
    warning: '#ffc53d',
    danger: '#ff4d4f',
    text: '#3D4051',
    gray: '#EDF0F1',
  },
  settings: {
    layout: '1', // String: 1, 2, 3, 4 and add your own
    boxedLayout: false, // Boolean: true, false
    fixedSidenav: false, // Boolean: true, false
    fixedHeader: false, // Boolean: true, false
    collapsedNav: false, // Boolean: true, false
    offCanvasNav: false, // Boolean: true, false
    sidenavWidth: 240, // Number
    offCanvasMobileNav: true, // Boolean: true, false. Mobile only, by default, it's true (off canvas)
    colorOption: '34', // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
    theme: 'light', // (WIP) String: light, gray, dark
  },
};

export default APPCONFIG;
