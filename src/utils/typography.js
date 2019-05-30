import Typography from 'typography';
import stAnnesTheme from 'typography-theme-st-annes';

// const CodePlugin = require('typography-plugin-code').default;
// stAnnesTheme.plugins = [new CodePlugin()];
// stAnnesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
//   // a: {
//   //   color: `#3A69A8`,
//   // },
//   // blockquote: {
//   //   marginLeft: 0,
//   //   paddingLeft: rhythm(5 / 8),
//   //   borderLeft: `${rhythm(3 / 8)} solid #CDE7B0`,
//   // },
//   // 'blockquote > *': {
//   //   fontStyle: `italic`,
//   // },
//   // 'blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4': {
//   //   marginTop: 0,
//   // },
//   // 'li > p': {
//   //   marginBottom: rhythm(1 / 2),
//   // },
//   // 'p code': {
//   //   fontSize: '75%',
//   // },
//   // 'tt,code': {
//   //   fontSize: '85%',
//   // },
//   // pre: {
//   //   lineHeight: 1.22,
//   // },
//   'h1,h2,h3,h4': {
//     marginBottom: rhythm(1 / 2),
//     marginTop: rhythm(2),
//   },
//   p: {
//     marginBottom: rhythm(1 / 2),
//     marginTop: rhythm(1 / 3),
//   },
// });

const typography = new Typography(stAnnesTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
