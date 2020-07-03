## Changelog

### v1.0.4

- fixed: default highlightjs support is supposed to be active by default and is not supposed to require configuration in the `mkdocs.yml` file.  This behavior was restored after recent changes.  highlightjs support can be removed by setting `theme > highlightjs` to `false`.

### v1.0.3

- fixed: favicon link

### v1.0.2

- fixed: incorrect position of p closing tag in the copyright footer (PR #88)
- fixed: incorrect position of br tag in footer

### v1.0.1

- fixed: removed duplicate hijs source initialization (PR #86)
- improved formatting of base.js source
- removed webfonts.js for Open Sans / PT Sans - Improves page load times, I don't see a significant downside in my testing

### v1.0.0

- convert to Inter typeface for headers
- convert to Inter typeface for side navigation menu
- increase H2 header top margin spacing

### v0.18.0

- updated Font Awesome to v5.12.0
- fixed: search modal close button alignment (PR #79)
- failure of sitemap.xml generation (IR #80) - added `site_url` field to `mkdocs.yml` and added documentation to explain how to fix this issue when Cinder is used to build documentation

### v0.17.0

- added support for keyboard shortcut bindings (PR #71)
- updated documentation with keyboard shortcut binding settings in the theme yaml settings file
- fixed: incorrect border radius CSS settings in dropdown menus (PR #72)
- fixed: webfont.js URL (PR #69)

### v0.16.3

- fixed: Hack webfont URL

### v0.16.2

- fixed: missing 404 page build (PR #65)
- fixed: focus search input when opening search modal (PR #63)

### v0.16.1

- included page revision metadata in the footer block of the base.html template file

### v0.16.0

- fix for jQuery associated bug that lead to failure of dropdown menu behavior as of v0.15.0. This required us to revert to v1.12.4 of jQuery as is used with Bootstrap 3 theme
- removed embedded jQuery and transitioned to jQuery served from Google CDN

### v0.15.0

- BACKWARDS INCOMPATIBLE UPDATE - you will need to update your Font Awesome icon classes, possibly make other changes.  Read through the modifications in detail and test your site if you are upgrading from previous versions of the Cinder theme.
- added admonition rendering support for note, warning, danger types from Markdown markup
- added Bootstrap alert support
- added Bootstrap-style callout support (derived and slightly modified from Chris Pratt's CSS source under MIT License https://codepen.io/chrisdpratt/details/IAymB/)
- added modified Github syntax highlighter CSS as default
- updated Font Awesome to v5.5.0
- updated highlightjs to v9.13.1
- updated jQuery to v3.3.1
- updated html5shiv to v3.7.3
- updated respond.js to v1.4.2
- updated Google webfont loader (webfont.js) to v1.6.28
- updated Hack typeface to v3.003 release
- fixed highlightjs syntax highlighter support
- modified highlightjs syntax highlighter language support to 29 languages
- fixed ToC scrolling when height > window height (Issue #43, PR #55)
- updated install/usage documentation with MkDocs v1.0+ YAML syntax
- updated install/usage documentation with information about new optional blocks
- updated specimen documentation with new source code example
- updated specimen documentation with new alert examples
- updated specimen documentation with new callouts examples
- removed `sites` directory from git version control
- minified all CSS files used in the theme
- added .gitignore targets

### v0.14.0

- added htmltitle block
- added extrahead block
- added footer block
- added optional revision date metadata in the footer

### v0.13.0

- added option to disable table of contents in a page-specific manner with page metadata setting `disable_toc: true`
- bugfix: fixed Google Analytics JavaScript in builds when this is defined in settings

### v0.12.3

- bugfix: fixed navigation links to address changes that were released in mkdocs v1.0

### v0.12.2

- bugfix: added mock setting to the `mkdocs_theme.yml` file to address an upstream mkdocs bug that occurs when this file is blank (issue #46)

### v0.12.1

- bugfix: added `*.yml` to MANIFEST.in file to support new yml settings file required for mkdocs v1.0+

### v0.12.0

- added `mkdocs_theme.yml` file to support mkdocs v1.0 settings file changes

### v0.11.0

- added support for Gitlab icon in navigation menus

### v0.10.2

- Fix the templates in base.html that have been changed in mkdocs 0.17

### v0.10.1

- added responsive image support

### v0.10.0

- added support for MkDocs v0.17 changes
- updated FontAwesome to v4.7.0

### v0.9.4

- added support for H3 header titles in sidebar menu (PR #9)

### v0.9.3

- Added support for > 2 level dropdown link depth (Issue #1 with PR #3)
- Updated Hack web fonts to v2.018

### v0.9.2

- Updated Hack web fonts to v2.015.


### v0.9.1

- modified the width of the footer horizontal line to avoid overlap with long TOC in the left sidebar
- minified the Bootstrap CSS
- modified the formatting of license declaration displays in the footer

### v0.9.0

- Initial release
