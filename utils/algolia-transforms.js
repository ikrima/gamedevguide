const HtmlExtractor = require(`algolia-html-extractor`)
const Extractor = new HtmlExtractor()

const chunkString = (str, length) => str.match(new RegExp(`(.|[\r\n]){1,` + length + `}`, `g`))

/**
 * Chunk Transformer
 * breaks down large strings into chunks small enough for algolia to handle
 * currently unused, but keeping it around just in cases
 */
module.exports.chunkTransformer = (chunksTotal, node) => {
    const htmlChunks = chunkString(node.html, 5000)
    const recordChunks = htmlChunks.reduce((recordChunksTotal, htmlChunksItem, idx) => [
        ...recordChunksTotal,
        { ...node, ...{ html: htmlChunksItem }, objectID: `${node.objectID}_${idx}` },
    ], [])

    return [...chunksTotal, ...recordChunks]
}

/**
 * Utility function, takes the output of HTML Extractor, and reduces it back down
 * So that there is a group of HTML/content per heading
 *
 * @param {Array} accumulator
 * @param {Object} fragment
 */
const reduceFragmentsUnderHeadings = (accumulator, fragment) => {
    const existingFragment = accumulator.find(existing => existing.anchor === fragment.anchor)

    if (existingFragment) {
        // Merge our fragments together
        if (fragment.node && fragment.node.tagName === `PRE`) {
            // For pre-tags, we don't keep all the markup
            existingFragment.html += ` ${fragment.content}` // keep a space
            existingFragment.content += ` ${fragment.content}` // keep a space
        } else {
            existingFragment.html += fragment.html
            existingFragment.content += ` ${fragment.content}` // keep a space
        }
    } else {
        // If we don't already have a matching fragment with this anchor, add it
        accumulator.push(fragment)
    }

    return accumulator
}

/**
 * Fragment Transformer
 * breaks down large HTML strings into sensible fragments based on headings
 */
module.exports.fragmentTransformer = (recordAccumulator, node) => {
    let htmlFragments = Extractor
        // These are the top-level HTML elements that we keep - this results in a lot of fragments
        .run(node.html, { cssSelector: `p,pre,td,li` })
        // Use the utility function to merge fragments so that there is one-per-heading
        .reduce(reduceFragmentsUnderHeadings, [])

    // convert our fragments for this node into valid objects, and merge int the
    const records = htmlFragments.reduce((fragmentAccumulator, fragment, index) => {
        // Don't need a reference to the html node type
        delete fragment.node
        // For now at least, we're not going to index the content string
        // The HTML string is already very long, and there are size limits
        delete fragment.content
        // If we have an anchor, change the URL to be a deep link
        if (fragment.anchor) {
            fragment.url = `${node.url}#${fragment.anchor}`
        }

        let objectID = `${node.objectID}_${index}`

        // If fragments are too long, we need this to see which fragment it was
        console.log(`indexing`, objectID, fragment.url || node.url, fragment.html.length) // eslint-disable-line no-console

        return [
            ...fragmentAccumulator,
            { ...node, ...fragment, objectID: objectID },
        ]
    }, [])

    return [...recordAccumulator, ...records]
}

module.exports._testReduceFragmentsUnderHeadings = reduceFragmentsUnderHeadings
