import React from 'react';

const numArray = [];
for (let i = 1; i < 10; i++) {
  numArray.push(i);
}

const Section = () => (
  <article className="article">
    <h2 className="article-title">Overlay</h2>

    <p>Overlays are often used when you want to make the content on top of an image more readable. It's used on components like Image Cards, Covers, Hero etc.</p>
    <p>You can add image overlay by adding <code>.overlay</code> class to element using an image background. The default <code>opacity</code> of overlay is set to <code>0.3</code> and you can change it by using different <code>.overlay-opacity-</code> class</p>
    <ul>
      {
        numArray.map((num) => (
          <li key={num}><code>.overlay-opacity-{num}</code> class sets the image overlay <code>opacity</code> to <code>0.{num}</code> </li>
        ))
      }
    </ul>

    <div className="divider my-5"></div>
    <p>Original image</p>
    <div style={{backgroundImage: "url('assets/images-demo/assets/600_400-4.jpg')", height: '300px'}} alt="cover" className="rounded img-cover" ></div>

    <div className="divider my-5"></div>
    <p><code>.overlay</code> class adds a simple overlay on top of the image </p>
    <div style={{backgroundImage: "url('assets/images-demo/assets/600_400-4.jpg')", height: '300px'}} alt="cover" className="rounded overlay img-cover" ></div>

    <div className="divider my-5"></div>
    <p><code>.overlay-bottom-up</code> class adds a gradient overlay from bottom to top</p>
    <div style={{backgroundImage: "url('assets/images-demo/assets/600_400-4.jpg')", height: '300px'}} alt="cover" className="rounded overlay-bottom-up img-cover" ></div>

    <div className="divider my-5"></div>
    <p><code>.overlay-top-down</code> class adds a gradient overlay from top to bottom</p>
    <div style={{backgroundImage: "url('assets/images-demo/assets/600_400-4.jpg')", height: '300px'}} alt="cover" className="rounded overlay-top-down img-cover" ></div>
  </article>
)

export default Section;
