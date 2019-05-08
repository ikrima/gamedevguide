const UE4Guide = require('./UE4Guide.json')
const Houdini = require('./Houdini.json')
const Graphics = require('./Graphics.json')

const listOfGuideTOCs = [UE4Guide, Houdini, Graphics]
const allGuideTOCs = {
  slug: '/',
  slugPart: '',
  order: 0,
  childTOCs: listOfGuideTOCs,
}

module.exports.default = allGuideTOCs
module.exports.guideNames = listOfGuideTOCs.map(toc => toc.slugPart)
