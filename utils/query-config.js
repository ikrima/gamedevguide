const markdownQueryConfig = [
    {
        section: `graphics`,
        indexName: `graphics`,
        niceName: `Graphics`,
    },
    {
        section: `houdini`,
        indexName: `houdini`,
        niceName: `Houdini`,
    },
    {
        section: `math`,
        indexName: `math`,
        niceName: `Math`,
    },
    {
        section: `programming`,
        indexName: `programming`,
        niceName: `Programming`,
    },
    {
        section: `opensource`,
        indexName: `opensource`,
        niceName: `Open Source`,
    },
    {
        section: `ue4guide`,
        indexName: `ue4guide`,
        niceName: `Ue4 Guide`,
    },
    {
        section: `blog`,
        indexName: `blog`,
        niceName: `Blog`,
    },
]

module.exports = {
    defaultMarkdownSection: `opensource`,
    markdownQueryConfig,
    searchConfig: markdownQueryConfig
        .reduce((acc, { indexName, niceName }) => {
            acc[indexName] = niceName
            return acc
        }, {}),
}
