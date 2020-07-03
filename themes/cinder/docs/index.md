<h1><i class="fas fa-fire" style="color:#FA023C"></i> Cinder Theme <small>for MkDocs</small></h1>

## About

Cinder is a clean, responsive theme for static documentation sites that are generated with [MkDocs](https://github.com/mkdocs/mkdocs). It's built on the [Bootstrap 3 framework](https://getbootstrap.com/docs/3.3/) and includes pre-packaged:

<small><i class="fas fa-highlighter" style="color:#FA023C"></i> **[highlight.js v9.18.0](https://highlightjs.org/) syntax highlighting with support for [185 languages (over 30 by default) and over 90 styles](https://highlightjs.org/static/demo/)**</small></br>
<small><i class="fab fa-font-awesome-alt" style="color:#FA023C"></i> **[FontAwesome v5.12.0](https://fortawesome.github.io/Font-Awesome/) icon support**</small></br>
<small><i class="fas fa-font" style="color:#FA023C"></i> **[smashingly legible type scheme](./specimen#typography) to get your message out to your users**</small>

You are viewing the theme in action and can see a selection of the theme elements on the [Specimen page](./specimen/).

## Install

**<em>Required</em>**: Python 3.4+

### Install MkDocs & Create a New Project

If you haven't installed MkDocs yet, use the following command to install it:

<pre><code class="shell">$ pip install mkdocs</code></pre>

Next, navigate to a clean directory and create a new MkDocs project with the following command:

<pre><code class="shell">$ mkdocs new [projectname]</code></pre>

Replace `[projectname]` with the name of your project (without the brackets).

Then navigate to the root of your project directory:

<pre><code class="shell">$ cd [projectname]</code></pre>

### Install the Cinder Theme

Download the Cinder theme archive by clicking the button below.

<a href="https://github.com/chrissimpkins/cinder/archive/v1.0.4.zip"><button type="button" class="btn btn-success"><i class="fas fa-cloud-download-alt fa-3x"></i> </br>  <span style="font-size:20px;">Download Cinder</span></button></a>

Unpack the contents of the archive into a directory named `cinder` at the top level of your MkDocs project directory.

Your project directory should now look like this:

<pre><code class="shell">.
├── mkdocs.yml
├── cinder
│     ├── css
│     ├── img
│     ├── js
│     ├── base.html
│     ├── content.html
│     ├── 404.html
│     ├── nav-sub.html
│     ├── nav.html
│     └── toc.html
└── docs
      └── index.md
</code></pre>

MkDocs projects use a YAML settings file called `mkdocs.yml`.  This is located in the root of your project directory after you use the `mkdocs new` command.  Open the file in a text editor and modify it to include the `theme` settings as follows:

<pre><code class="yaml">site_name: [YOURPROJECT]
theme:
  name: null
  custom_dir: 'cinder'
nav:
  - Home: index.md</code></pre>

See the [MkDocs documentation](https://www.mkdocs.org/user-guide/custom-themes/#creating-a-custom-theme) for additional details.

<div class="bs-callout bs-callout-default">
  <h4>Updates, the Manual Approach</h4>
  If you choose the manual install approach, you can update your Cinder theme by downloading the new cinder.zip release archive and including it in your project. Then re-build your static site files (see instructions below).
</div>

## Test with a Local Site Server

Use the following command to establish a local server for your site:

<pre><code class="shell">$ mkdocs serve</code></pre>

Then open your site in any browser at the URL `http://localhost:8000`.

## Create Your Site

### Add Content with Markdown Syntax

Get to work on your site home page by opening the `docs/index.md` file and editing it in Markdown syntax.  The HTML automatically updates in the browser when you save the Markdown file if you use the MkDocs server (see command above).

### Add New Pages

Add new pages to your site by creating a new Markdown file in your `docs` directory, then linking to the new page in the `mkdocs.yml` file.  This uses a `Page Name : Markdown file` syntax.

For example, to add an About page using a Markdown file that is located on the path `docs/about.md`, you would format the `mkdocs.yml` file as follows:

<pre><code class="yaml">site_name: [YOURPROJECT]
theme:
  name: null
  custom_dir: 'cinder'
nav:
  - Home: index.md
  - About: about.md</code></pre>

Add additional pages to your site by repeating the above series of steps.

## Build Your Site

Build your site files with the command:

<pre><code class="shell">$ mkdocs build</code></pre>

Your site files are built in the `site` directory and are ready to use.  Deploy the contents of the `site` directory to your web server.

## Important Configuration Issues

<div class="bs-callout bs-callout-warning">
  <h4><i class="fas fa-exclamation-triangle"></i> Please review these issues before you push your site into a production setting!</h4>
</div>

### 1. Set the `site_url` configuration field
You must set the `site_url` field in your `mkdocs.yml` file to the appropriate production URL in order to generate a valid `sitemap.xml` file ([issue #80](https://github.com/chrissimpkins/cinder/issues/80)).

Here is an example from the [Cinder project `mkdocs.yml` file](https://github.com/chrissimpkins/cinder/blob/master/mkdocs.yml):

```yml
site_name: Cinder
site_url: https://sourcefoundry.org/cinder/
site_author: Christopher Simpkins
site_description: "A clean, responsive theme for static documentation websites that are generated with MkDocs"
repo_url: "https://github.com/chrissimpkins/cinder"
copyright: "Cinder is licensed under the <a href='https://github.com/chrissimpkins/cinder/blob/master/LICENSE.md'>MIT license</a>"

theme:
  name: null
  custom_dir: cinder
  colorscheme: github
  highlightjs: true
  hljs_languages:
    - yaml

nav:
  - Home: index.md
  - Specimen: specimen.md

markdown_extensions:
  - admonition
```

The `sitemap.xml` file will be located at `[SITE_URL]/sitemap.xml` when you push your site into the production environment.  During development the `sitemap.xml` file can be found at `http://127.0.0.1:8000/sitemap.xml`.

## Site Customization

The following are a few common customizations that you might be interested in.  For much more detail about the configuration of your site, check out the [MkDocs Configuration documentation](https://github.com/mkdocs/mkdocs/blob/master/docs/user-guide/configuration.md).

### Syntax Highlighting Color Scheme

Cinder supports the [90+ highlightjs color schemes](https://highlightjs.org/static/demo/).  The `github` color scheme that you see on this page is the default and will be used if you do not specify otherwise.

To change to a different scheme, include the `colorscheme` field under the `theme` field in your `mkdocs.yml` file and enter the color scheme name.  For example, to switch to the [Dracula theme](https://draculatheme.com/), enter the following:

```yml
theme:
  name: null
  custom_dir: cinder
  colorscheme: dracula

```

and then rebuild your site.

The color scheme name should match the base name of the highlightjs CSS file.  See the [`src/styles` directory of the highlightjs repository](https://github.com/highlightjs/highlight.js/tree/master/src/styles) for a complete list of these CSS paths.

### Syntax Highlighting Language Support

By default, Cinder supports the ~30 syntaxes listed under `common` in [the documentation](https://highlightjs.org/static/demo/).  You can broaden support to any of the over 130 highlightjs languages using definitions in your `mkdocs.yml` file.

To add a new language, create a list of additional languages as a `hljs_languages` sub-field under the `theme` field in the `mkdocs.yml` file.  The definitions are formatted as a newline-delimited list with `-` characters.

For example, to add support for the Julia and Perl languages, format your configuration file like this:

```yml
theme:
  name: null
  custom_dir: cinder
  hljs_languages:
      - julia
      - perl
```

Use the base file name of the [JavaScript files located in the CDN](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/languages/) for your syntax definitions.

### Site Favicon

Create an `img` subdirectory in your `docs` directory and add a custom favicon.ico file.  See the [MkDocs documentation](https://www.mkdocs.org/#changing-the-favicon-icon) for additional details.

### Add Your Own CSS Stylesheets

Create a `css` directory inside your `docs` directory and add your CSS files.  You can overwrite any of the Cinder styles in your CSS files.  Then include your CSS files in the `mkdocs.yml` file with the `extra_css` field:

<pre><code class="yaml">site_name: [YOURPROJECT]
theme: cinder
extra_css:
  - "css/mystyle.css"
  - "css/myotherstyle.css"
nav:
  - Home: index.md
  - About: about.md</code></pre>

Your CSS styles fall at the end of the cascade and will override all styles included in the theme (including Bootstrap and default Cinder styles).  You can find the Cinder and Bootstrap CSS files on the paths `cinder/css/cinder.css` and `cinder/css/bootstrap.min.css`, respectively.


### Add Your Own JavaScript

Create a `js` directory inside your `docs` directory and add your JS files.  Then include your JS files in the `mkdocs.yml` file with the `extra_js` field:

<pre><code class="yaml">site_name: [YOURPROJECT]
theme: cinder
extra_js:
  - "js/myscript.js"
  - "js/myotherscript.js"
nav:
  - Home: index.md
  - About: about.md</code></pre>

### Keyboard shortcuts

Place the following in your `mkdocs.yml` file to enable keyboard shortcuts:

```shell
shortcuts:
    help: 191    # ?
    next: 39     # right arrow
    previous: 37 # left arrow
    search: 83   # s
```

The numbers correspond to the key that you would like to use for that shortcut. You can use [https://keycode.info/](https://keycode.info/) to find the keycode you want.

### Extending Cinder

Create a new directory within your project (e.g., `cinder-theme-ext/`) and create `main.html`. Add the following line at the top of the HTML file.

```html
{% extends "base.html" %}
```

Instead of using `theme_dir: cinder` in `mkdocs.yml`, use:

<pre><code class="yaml">theme:
    name: cinder
    custom_dir: [custom dir]</code></pre>

Refer to [MkDocs Documentation - Using the theme custom_dir](https://www.mkdocs.org/user-guide/styling-your-docs/#using-the-theme-custom_dir) for more information.

Use the following examples as reference. You can put your own [Jinja2](http://jinja.pocoo.org/) within the blocks. More information can be found in [MkDocs Documentation - Overriding Template Blocks](https://www.mkdocs.org/user-guide/styling-your-docs/#overriding-template-blocks).

#### Adding extra HTML to the head tag

Append to `main.html`:

```html
{% block extrahead %}
      <meta name="author" content="{{ page.meta.author }}">
{% endblock %}
```

#### Replacing footer

Append to `main.html`:

```html
{% block footer %}
<hr>
<p>{% if config.copyright %}
      <small>{{ config.copyright }}<br></small>
{% endif %}
<small>Documentation built with <a href="http://www.mkdocs.org/">MkDocs</a>.</small>
{% if page.meta.revision_date %}
      <small><br><i>Updated {{ page.meta.revision_date }}</i></small>
{% endif %}
</p>
{% endblock %}
```

`page.meta.revision_date` can be set by using [meta-data (front-matter)](https://www.mkdocs.org/user-guide/writing-your-docs/#meta-data) at the beginning of your Markdown document or using [mkdocs-git-revision-date-plugin](https://github.com/zhaoterryy/mkdocs-git-revision-date-plugin).

### Github or Bitbucket Repository Link

Include the `repo_url` field and define it with your repository URL:

<pre><code class="yaml">site_name: [YOURPROJECT]
theme: cinder
repo_url: "https://github.com/chrissimpkins/cinder"
nav:
  - Home: index.md
  - About: about.md</code></pre>

The link appears at the upper right hand corner of your site.

### License Declaration and Link

The Cinder theme displays your license declaration in the footer if you include a `copyright` field and define it with the text (and optionally the HTML link) that you would like to display:

<pre><code class="yaml">site_name: [YOURPROJECT]
theme: cinder
copyright: "Cinder is licensed under the &lt;a href='https://github.com/chrissimpkins/cinder/blob/master/LICENSE.md'&gt;MIT license</a>"
nav:
  - Home: index.md
  - About: about.md</code></pre>

## Issues

If you have any issues with the theme, please report them on the Cinder repository:

<a href="https://github.com/chrissimpkins/cinder/issues/new"><button class="btn btn-primary btn-lg" type="submit"><i class="fab fa-github fa-2x"></i> Report Issue</button></a>
<a href="https://github.com/chrissimpkins/cinder/issues"><button class="btn btn-primary btn-lg" type="submit"> Active Issues <i class="fab fa-github fa-2x"></i></button></a>

## License

Cinder is licensed under the [MIT license](https://github.com/chrissimpkins/cinder/blob/master/LICENSE.md).
