const _ = require('lodash')
const { pathPrefix } = require('../gatsby-config')

// Replacing '/' would result in empty string which is invalid
const removeTrailingFwdSlash = inPath => (inPath === '/' ? inPath : inPath.replace(/\/$/, ''))

const toRelativeSitePath = inPath => {
  const splitPath = removeTrailingFwdSlash(inPath).split(removeTrailingFwdSlash(pathPrefix))
  return _.isEmpty(splitPath) || splitPath.length < 2 ? '/' : `/${splitPath.slice(1).join('/')}`
}

const toRelativePathSlugs = inPath => toRelativeSitePath(inPath).split('/')

const sanitizePath = inPath =>
  // eslint-disable-next-line prettier/prettier
  removeTrailingFwdSlash(inPath.replace(/[^/a-z0-9]/gi, '-').toLowerCase())

const prettifyPath = inPath => {
  const retPath = _.startCase(inPath)
  return retPath.replace('Ue 4', 'UE4')
}

const getBreadCrumbRootPrefix = inPath => {
  const curSiteRelPagePath = toRelativeSitePath(sanitizePath(inPath))
  return `/${curSiteRelPagePath.split('/')[1]}`
}

const safeGetWindowPath = () =>
  typeof window !== 'undefined' ? window.location.pathname : 'undefined'

exports.removeTrailingFwdSlash = removeTrailingFwdSlash
exports.toRelativeSitePath = toRelativeSitePath
exports.toRelativePathSlugs = toRelativePathSlugs
exports.sanitizePath = sanitizePath
exports.prettifyPath = prettifyPath
exports.getBreadCrumbRootPrefix = getBreadCrumbRootPrefix
exports.safeGetWindowPath = safeGetWindowPath
