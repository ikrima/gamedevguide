//const { pathPrefix } = require("../SiteCfg")
const { pathPrefix } = require("../gatsby-config")
const _ = require("lodash")
//import { pathPrefix } from "../gatsby-config"

// Replacing '/' would result in empty string which is invalid
exports.removeTrailingFwdSlash = removeTrailingFwdSlash = inPath => (inPath === `/` ? inPath : inPath.replace(/\/$/, ``))
exports.toRelativeSitePath     = toRelativeSitePath = inPath => {
  const splitPath = removeTrailingFwdSlash(inPath).split(removeTrailingFwdSlash(pathPrefix))
  return _.isEmpty(splitPath) || splitPath.length < 2 ? "/" : "/" + splitPath.slice(1).join("/")
}
exports.sanitizePath = sanitizePath = inPath => {
    return removeTrailingFwdSlash(inPath.replace(/[^\/a-z0-9]/gi, "-").toLowerCase())
}
exports.prettifyPath = prettifyPath = inPath => _.startCase(inPath)

exports.getBreadCrumbRootPrefix  = getBreadCrumbRoot = inPath => {
  const curSiteRelPagePath = toRelativeSitePath(sanitizePath(inPath))
  return "/" + curSiteRelPagePath.split("/")[1]
}

exports.safeGetWindowPath = safeGetWindowPath = () =>  ((typeof window !== "undefined") ? window.location.pathname : "undefined")