/**
# Gatsby Remark Snippet Plugin

This is a gatsby plugin that describes a remark plugin which in turn uses unified.

Docs:

Gatsby Plugins: https://www.gatsbyjs.org/docs/creating-plugins/
Gatsby Remark Plugins: https://www.gatsbyjs.org/docs/remark-plugin-tutorial/
Unified Plugins: https://unified.js.org/create-a-plugin.html#plugin

This Snippet Plugin describes blocks of example code that we want to appear with syntax highlighting.
Code blocks often have a title, and may have multiple examples for different languages.
Actual code is stored in files to keep markdown files easy to read.

Usage examples:

[[Snippet]]
| embed://path/to/file.js | Title | Language Override
| embed://path/to/file.rb | Title | Language Override

[[Snippet | Title]]
| embed://path/to/file.js
 */

const fs = require(`fs`)
const normalizePath = require(`normalize-path`)
const visit = require(`unist-util-visit`)

// This map tracks languages that don't match their extension.
const FILE_EXTENSION_TO_LANGUAGE_MAP = {
    js: `jsx`,
    md: `markup`,
    sh: `bash`,
    rb: `ruby`,
}

// Utility Function to figure out what language we want to render
function getLanguage(file) {
    if (!file.includes(`.`)) {
        return `none`
    }

    const extension = file.split(`.`).pop()
    return FILE_EXTENSION_TO_LANGUAGE_MAP.hasOwnProperty(extension) ? FILE_EXTENSION_TO_LANGUAGE_MAP[extension] : extension.toLowerCase()
}

const C_NEWLINE = `\n`
const C_FENCE = `|`
const snippetRegex = new RegExp(`\\[\\[Snippet(?: *\\| *(.*))?\\]\\]\n`)
const embedRegex = new RegExp(`embed://(.*)`)

/**
 * [[Snippet ]] Parser
 *
 * Parsers are made up of tokenizers and compilers.
 * This code is heavily based upon https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-custom-blocks
 */
function snippetTokenizer(eat, value) {
    const now = eat.now()
    const keep = snippetRegex.exec(value)
    if (!keep) {
        return
    }
    if (keep.index !== 0) {
        return
    }

    const [eaten, blockTitle] = keep
    const linesToEat = []
    const contents = []

    let idx = 0
    while ((idx = value.indexOf(C_NEWLINE)) !== -1) {
        const next = value.indexOf(C_NEWLINE, idx + 1)
        // either slice until next NEWLINE or slice until end of string
        const lineToEat = next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1)
        if (lineToEat[0] !== C_FENCE) {
            break
        }
        // remove leading `FENCE ` or leading `FENCE`
        const line = lineToEat.slice(lineToEat.startsWith(`${C_FENCE} `) ? 2 : 1)
        linesToEat.push(lineToEat)

        // Parse the embed lines into the AST representation of markdown code blocks
        if (!embedRegex.test(line)) {
            contents.push({ code: line, lang: `text`, type: `code` })
        } else {
            const lineData = embedRegex.exec(line)[1]
            const [file, title, lang] = lineData.split(`|`).map(x => x.trim())
            contents.push({ file, title, lang, type: `code` })
        }

        value = value.slice(idx + 1)
    }

    // Parse everything else into AST representation of HTML
    const stringToEat = eaten + linesToEat.join(C_NEWLINE)
    const add = eat(stringToEat)
    const exit = this.enterBlock()

    // CASE:  This is a single snippet with a title div
    if (contents.length === 1) {
        exit()

        if (blockTitle) {
            const titleNode = {
                type: `singleSnippetTitle`,
                data: {
                    hName: `div`,
                    hProperties: {
                        className: `gatsby-code-title`,
                    },
                },
                children: this.tokenizeInline(blockTitle, now),
            }

            contents.unshift(titleNode)
        }

        add({
            type: `singleSnippetBlock`,
            children: contents,
        })
        return
    }

    // CASE: This is a multiple snippet with a language switcher
    const blockChildren = []

    contents.forEach((content, i) => {
        blockChildren.push({
            type: `multiSnippetRadio`,
            data: {
                hName: `input`,
                hProperties: {
                    name: `tabs`,
                    type: `radio`,
                    id: `tab-${i}`,
                    checked: i === 0,
                },
            },
        })

        blockChildren.push({
            type: `multiSnippetTitle`,
            data: {
                hName: `label`,
                hProperties: {
                    for: `tab-${i}`,
                },
            },
            children: this.tokenizeInline(content.title, now),
        })

        blockChildren.push({
            type: `multiSnippetItem`,
            children: [content],
            data: {
                hProperties: {
                    className: `code-panel panel`,
                },
            },
        })
    })

    exit()

    add({
        type: `multiSnippetBlock`,
        children: blockChildren,
        data: {
            hProperties: {
                className: `code-tabs`,
            },
        },
    })
    return
}

function snippetCompiler() {
    let embed
    let title

    return {
        block(node) {
            embed = ``
            title = ``
            this.all(node)

            if (title) {
                return `[[snippet | ${title}]]\n| ${embed}`
            } else {
                return `[[snippet]]\n| ${embed}`
            }
        },
        blockItem(node) {
            return this.all(node).map(s => s.replace(/\n/g, `\n| `)).join(`\n|\n| `)
        },
    }
}

/**
 * Plugin that adds [[snippet]] blocks.
 * It sets up the usage of snippetTokenizer and snippetCompiler
 */
function snippetBlockPlugin() {
    const Parser = this.Parser

    // Inject blockTokenizer
    const blockTokenizers = Parser.prototype.blockTokenizers
    const blockMethods = Parser.prototype.blockMethods

    blockTokenizers.snippetBlocks = snippetTokenizer

    // This inserts the snippet parsing just after the fencedCode block parsing
    blockMethods.splice(blockMethods.indexOf(`fencedCode`) + 1, 0, `snippetBlocks`)

    const Compiler = this.Compiler
    if (Compiler) {
        const visitors = Compiler.prototype.visitors
        if (!visitors) {
            return
        }
        const compiler = snippetCompiler()
        visitors.snippetBlock = compiler.block
        visitors.snippetBlockItem = compiler.blockItem
    }

    // Inject into interrupt rules
    const interruptParagraph = Parser.prototype.interruptParagraph
    const interruptList = Parser.prototype.interruptList
    const interruptBlockquote = Parser.prototype.interruptBlockquote
    interruptParagraph.splice(interruptParagraph.indexOf(`fencedCode`) + 1, 0, [`snippetBlocks`])
    interruptList.splice(interruptList.indexOf(`fencedCode`) + 1, 0, [`snippetBlocks`])
    interruptBlockquote.splice(interruptBlockquote.indexOf(`fencedCode`) + 1, 0, [`snippetBlocks`])
}

/**
 * Read Embed from Code Block
 *
 * Remark Plugin for reading `code` blocks that have a file property
 * All file paths are read and the contents injected into the code block
 */
function readEmbedFromCodeBlock({ markdownAST }, pluginOptions) {
    pluginOptions = pluginOptions || {}
    let directory = pluginOptions.directory

    if (!directory) {
        throw Error(`Required option "directory" not specified`)
    } else if (!fs.existsSync(directory)) {
        throw Error(`Invalid directory specified "` + directory + `"`)
    } else if (!directory.endsWith(`/`)) {
        directory += `/`
    }

    visit(markdownAST, `code`, function (node) {
        if (node.file) {
            const path = normalizePath(`` + directory + node.file)
            if (!fs.existsSync(path)) {
                throw Error(`Invalid snippet specified; no such file "` + path + `"`)
            }

            node.lang = node.lang || getLanguage(node.file)
            node.value = fs.readFileSync(path, `utf8`).trim()
        }
    })

    return markdownAST
}

// --------------
// ## Quick Overview
// How this works...

// This sets up a remark plugin which gets called as remark walks its AST.
// It changes the processing of the existing markdown syntax for code blocks
// such that if the code block has a file property, the file is opened and the contents are injected into the code block.
module.exports = readEmbedFromCodeBlock

// This adds a brand new parser plugin - adding the ability for remark to understand blocks that look like
// [[Snippet]]
// |
// As though it's a standard part of markdown :)
//
// During the parsing of a [[Snippet]] block, we turn the embeds from being lines starting with |
// into new code blocks with a "file" property, which are then processed by readEmbedFromCodeBlock.
// By converting these to natural code blocks, we make this plugin compatible with gatsby-remark-prismjs.
module.exports.setParserPlugins = options => [[snippetBlockPlugin, options]]
