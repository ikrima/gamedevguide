import React from 'react';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Notation</h2>
    <p>Spacing utilities that apply to all breakpoints, from <code>xs</code> to <code>xl</code>, have no breakpoint abbreviation in them. This is because those classes are applied from <code>min-width: 0</code> and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.</p>
    <p>The classes are named using the format <code>(property)(sides)-(size)</code> for <code>xs</code> and <code>(property)(sides)-(breakpoint)-(size)</code> for <code>sm, md, lg, and xl</code>.</p>
    <p>Where property is one of:</p>
    <ul>
      <li><code>m</code> - for classes that set <code>margin</code></li>
      <li><code>p</code> - for classes that set <code>padding</code></li>
    </ul>
    <p>Where <em>sides</em> is one of:</p>
    <ul>
      <li><code>t</code> - for classes that set <code>margin-top</code> or <code>padding-top</code></li>
      <li><code>b</code> - for classes that set <code>margin-bottom</code> or <code>padding-bottom</code></li>
      <li><code>l</code> - for classes that set <code>margin-left</code> or <code>padding-left</code></li>
      <li><code>r</code> - for classes that set <code>margin-right</code> or <code>padding-right</code></li>
      <li><code>x</code> - for classes that set <code>both *-left</code> and <code>*-right</code></li>
      <li><code>y</code> - for classes that set <code>both *-top</code> and <code>*-bottom</code></li>
      <li>blank - for classes that set a <code>margin</code> or <code>padding</code> on all 4 sides of the element</li>
    </ul>
    <p>Where <em>size</em> is one of:</p>
    <ul>
      <li><code>0</code> - for classes that eliminate the <code>margin</code> or <code>padding</code> by setting it to <code>0</code></li>
      <li><code>1</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem * .25</code></li>
      <li><code>2</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem * .5</code></li>
      <li><code>3</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem</code></li>
      <li><code>4</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem * 1.5</code></li>
      <li><code>5</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem * 3</code></li>
      <li><code>6</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem * 4.5</code></li>
      <li><code>7</code> - (by default) for classes that set the <code>margin</code> or <code>padding</code> to <code>1rem * 6</code></li>
      <li><code>auto</code> - for classes that set the <code>margin</code> to auto</li>
    </ul>
  </article>
)

export default Section;
