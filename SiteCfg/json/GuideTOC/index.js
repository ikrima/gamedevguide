const UE4Guide = require('./UE4Guide.json');
const Houdini = require('./Houdini.json');
const Graphics = require('./Graphics.json');
const OpenSource = require('./OpenSource.json');
const Math = require('./Math.json');
const Programming = require("./Programming.json");

const listOfGuideTOCs = [UE4Guide, Houdini, Graphics, OpenSource, Math, Programming];
const allGuideTOCs = {
  slug: '/',
  slugPart: '',
  order: 0,
  childTOCs: listOfGuideTOCs,
};

module.exports.allGuideTOCs = allGuideTOCs;
module.exports.guideNames = listOfGuideTOCs.map(toc => toc.slugPart);
