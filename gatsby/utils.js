const _ = require('lodash')
const S = require('underscore.string.fp')
const { pathPrefix } = require('../gatsby-config')
const { guideNames } = require('../SiteCfg/json/GuideTOC')

// Replacing '/' would result in empty string which is invalid
const _toNoTrailingSlashSitePath = inPath => (inPath === '/' ? inPath : inPath.replace(/\/$/, ''))

const _toRelSitePath = inPath => {
  const splitPath = _toNoTrailingSlashSitePath(inPath).split(_toNoTrailingSlashSitePath(pathPrefix))
  return _.isEmpty(splitPath) || splitPath.length < 2 ? '/' : `/${splitPath.slice(1).join('/')}`
}

const _pathToSlug = inFilePath =>
  inFilePath
    .split('/')
    .map(S.slugify)
    .join('/')

const absFilePathToSlug = inFilePath =>
  _pathToSlug(_toRelSitePath(_toNoTrailingSlashSitePath(inFilePath)))
const relFilePathToSlug = inFilePath => _pathToSlug(_toNoTrailingSlashSitePath(inFilePath))
const prettifySlug = inSlug => {
  let retPath = _.startCase(inSlug)
  const abbrList = ['ue4', 'ubt']
  const untokenizeList = [['Ue 4', 'UE4']]
  retPath = abbrList.reduce(
    (retString, abbr) => retString.replace(new RegExp(`/b${abbr}/b`), String.toUpperCase),
    retPath
  )
  retPath = untokenizeList.reduce(
    (retString, untoken) => retString.replace(new RegExp(`/b${untoken[0]}/b`), untoken[1]),
    retPath
  )
  return retPath
}

const separateSlugs = inSlug => inSlug.split('/')

const getBreadCrumbRootPrefix = (inRelSitePath, frontmatter = null) => {
  if (frontmatter && frontmatter.root) {
    return `/${frontmatter.root}`
  }
  const curSiteRelPagePath = relFilePathToSlug(inRelSitePath)
  return `/${curSiteRelPagePath.split('/')[1]}`
}
const safeGetWindowPath = () =>
  typeof window !== 'undefined' ? window.location.pathname : 'undefined'

const safeGetRelWindowPath = () =>
  typeof window !== 'undefined' ? absFilePathToSlug(window.location.pathname) : 'undefined'

const safeGetRelWindowPathSlugs = () => {
  const retSlugArray = separateSlugs(safeGetRelWindowPath())
  if (retSlugArray.length > 1 && _.isEmpty(_.first(retSlugArray))) {
    return retSlugArray.slice(1, retSlugArray.length)
  }
  return retSlugArray
}
const isGuideName = inName => guideNames.includes(inName)
const getGuideNameFromWindowPath = () => {
  const curSlugArray = safeGetRelWindowPathSlugs()
  return isGuideName(_.first(curSlugArray)) ? _.first(curSlugArray) : 'undefined'
}

exports.separateSlugs = separateSlugs
exports.prettifySlug = prettifySlug
exports.absFilePathToSlug = absFilePathToSlug
exports.relFilePathToSlug = relFilePathToSlug
exports.getBreadCrumbRootPrefix = getBreadCrumbRootPrefix
exports.safeGetWindowPath = safeGetWindowPath
exports.safeGetRelWindowPath = safeGetRelWindowPath
exports.safeGetRelWindowPathSlugs = safeGetRelWindowPathSlugs
exports.isGuideName = isGuideName
exports.getGuideNameFromWindowPath = getGuideNameFromWindowPath
