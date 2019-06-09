## Webdev bs Pt 2

### WORK DONE

- The other option is to stick with Ant Design
- This should also not reset the scroll position of the sidebar toc menu
- Autoexpand sidebar when someone goes to a page directly
- Add search bar on the left column to search headings
- Make submenu headings in sidebar more noticable and more vertically more compact
- Add support for ordering between sidebar toc submenu headers and site pages
- Search results page should also display excerpts and highlights

## TODO

- [ ]
- [ ] (example: https://gatsby-docz.netlify.com/docs/)
- [ ]
- [ ] #Perf: The site responsiveness in clicking around is sluggish compared to how fast it should be
- [ ] This is the level of site responsiveness to reach: Live Site: <https://gatsby-docs-starter.netlify.com/lesson-one> & Source: <https://github.com/ericwindmill/gatsby-starter-docs>
- Ofcourse look at the code or perf profile, but some thoughts on what it could be:
- Might be reloading the entire page
- Some expensive initialization might be reperformed on every page click vs being persistent
- Some advanced gatsby configuration settings might be set wrong. For example, the gatsby starter used for our site was the basic gatsby starter while the Gatsby Docs Starter used the Gatsby Advanced Starter. In the [Readme](https://github.com/ericwindmill/gatsby-starter-docs), it references "fast loading times thanks to pre-rendered HTML & automatic chunk loading of JS files"

- [ ] Improve the search components
- [ ] Inline seach should display a list of excerpts and highlights
- [ ]
- [ ] Allow search for specific guides
      GitHub
      jannikbuschke/gatsby-antd-docs
      A gatsby starter for a technical documentation website - jannikbuschke/gatsby-antd-docs
      gatsby-docz.netlify.com
      Button
      Coolest Library
      GitHub
      ericwindmill/gatsby-starter-docs
      A GatsbyJS starter made for documentation sites. Contribute to ericwindmill/gatsby-starter-docs development by creating an account on GitHub.
