/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from './gatsby/wrap-with-provider'

require('prismjs/themes/prism-tomorrow.css')

export const wrapRootElement = wrapWithProvider
