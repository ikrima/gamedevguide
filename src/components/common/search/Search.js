import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import {
    Highlight,
    Snippet,
    Index,
    Configure,
    connectAutoComplete,
} from 'react-instantsearch-dom'
import Autosuggest from 'react-autosuggest'

import { Spirit } from '../../../styles/spirit-styles'
import { searchConfig } from '../../../../utils/query-config'

const HitTemplate = ({ hit }) => {
    let hitOnCurrentSite = false

    // The Algolia app now contains indexes from Docs as well as ghost.org.
    // We therefore send absolute URLs now to Algolia, but need to strip them
    // out again if the search result is on the current site, so we can determine
    // if we use Gatsby Link or standard <a> tag.
    // TODO: remove this again, once the move to G3 is fully completed
    const siteUrl = `^${process.env.SITE_URL || `https://docs.ghost.org`}`
    const siteUrlRegex = new RegExp(siteUrl)

    if (hit.url.match(siteUrlRegex)) {
        hit.url = hit.url.replace(siteUrlRegex, ``)
        hitOnCurrentSite = true
    }
    return (
        <>
            {hitOnCurrentSite ?
                <Link to={hit.url} className="tdn db pt3 pb3 blue search-result nl5 nr11 pl5 pr11 br3 br--left">
                    <h4 className={`${Spirit.h5} dib`}>
                        <Highlight attribute="title" hit={hit} tagName="mark" className="search-result-page blue" />
                    </h4>
                    <p className={`${Spirit.small} midgrey nudge-bottom--2`}>
                        <Snippet attribute="html" hit={hit} className="search-result-snippet" />
                ...
                    </p>
                </Link> :
                <a href={hit.url} className="tdn db pt3 pb3 blue search-result nl5 nr11 pl5 pr11 br3 br--left">
                    <h4 className={`${Spirit.h5} dib`}>
                        <Highlight attribute="title" hit={hit} tagName="mark" className="search-result-page blue" />
                    </h4>
                    <p className={`${Spirit.small} midgrey nudge-bottom--2`}>
                        <Snippet attribute="html" hit={hit} className="search-result-snippet" />
                        ...
                    </p>
                </a>
            }
        </>
    )
}

HitTemplate.propTypes = {
    hit: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
}

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.currentRefinement,
        }

        this.onChange = this.onChange.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.getSuggestionValue = this.getSuggestionValue.bind(this)
        this.renderSuggestion = this.renderSuggestion.bind(this)
        this.renderSectionTitle = this.renderSectionTitle.bind(this)
        this.getSectionSuggestions = this.getSectionSuggestions.bind(this)
    }

    onChange(event, { newValue }) {
        this.setState(() => {
            return { value: newValue }
        })
    }

    onSuggestionsFetchRequested({ value }) {
        this.props.refine(value)
    }

    onSuggestionsClearRequested() {
        this.props.refine()
    }

    getSuggestionValue(hit) {
        return hit.title
    }

    renderSuggestion(hit) {
        return <HitTemplate hit={hit} />
    }

    renderSectionTitle({ index }) {
        // TODO: handle this with query-config
        searchConfig.marketplace = `Marketplace`
        searchConfig.blog = `Blog`
        searchConfig.faq = `FAQ`
        searchConfig.tutorial = `Tutorials`
        searchConfig.integration = `Integrations`

        const labelClass = {
            faq: `faq-color b--faq-color`,
            concept: `concept-color b--concept-color`,
            setup: `setup-color b--setup-color`,
            api: `middarkgrey b--middarkgrey`,
            tutorial: `tutorial-color b--tutorial-color`,
            integration: `integration-color b--integration-color`,
            blog: `concept-color b--concept-color`,
            marketplace: `setup-color b--setup-color`,
        }

        return <span className={`br-pill bg-white ba pa1 pl2 pr2 nowrap ${labelClass[index] || `midgrey b--midgrey`}`}>{searchConfig[index]}</span>
    }

    getSectionSuggestions(section) {
        return section.hits
    }

    render() {
        // Don't show sections with no results
        const hits = this.props.hits.filter(hit => hit.hits && hit.hits.length !== 0)

        const { value } = this.state
        const inputProps = {
            placeholder: `Search documentation...`,
            onChange: this.onChange,
            value,
            autoFocus: true,
            "data-cy": `search-input`,
        }

        const inputTheme = `input-reset form-text b--transparent search-modal-field-bg br-pill flex-auto whitney lh-normal pa2 pl8 plr3 w-100 dark-placeholder`

        const theme = {
            input: inputTheme,
            inputOpen: inputTheme,
            inputFocused: inputTheme,
            suggestionsContainerOpen: `pa11 pt3 pb3 mt10 bt b--whitegrey nl10 nr10 nb10 search-modal-result-container`,
            suggestionsList: `list pa0 ma0 pt1 search-modal-suggestion-list flex-auto ml11`,
            sectionContainer: `pb4`,
            sectionTitle: `f8 lh-h4 fw5 midgrey w30 tr mt2 sticky top-2 pr2`,
        }

        return (
            <>
                <Configure hitsPerPage="5" />
                <Autosuggest
                    suggestions={hits}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    multiSection={true}
                    theme={theme}
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                />
                <Index indexName="faq" />
                <Index indexName="concept" />
                <Index indexName="setup" />
                <Index indexName="api" />
                <Index indexName="tutorial" />
                <Index indexName="integration" />
                <Index indexName="blog" />
                <Index indexName="marketplace" />
            </>
        )
    }
}

Results.propTypes = {
    hits: PropTypes.arrayOf(
        PropTypes.object.isRequired,
    ).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
}

const AutoComplete = connectAutoComplete(Results)

export default AutoComplete
