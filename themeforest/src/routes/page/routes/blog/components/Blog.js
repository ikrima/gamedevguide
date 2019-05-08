import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';
import './styles.scss';

const posts = [
  {
    title: 'Dolor sit amet, consectetur adipisicing elit.',
    avatar: 'assets/images-demo/avatars/1.jpg',
    author: 'Jason Bourne',
    category: 'Web Design'
  }, {
    title: 'Repellat quo rerum iure dolor cumque',
    avatar: 'assets/images-demo/avatars/2.jpg',
    author: 'Bella Swan',
    category: 'Development'
  }, {
    title: 'Eligendi doloribus quam amet provident est recusandae ipsum voluptatem',
    avatar: 'assets/images-demo/avatars/3.jpg',
    author: 'Min Chan',
    category: 'Web Design'
  }, {
    title: 'Laudantium possimus quia ducimus, iusto, placeat',
    avatar: 'assets/images-demo/avatars/4.jpg',
    author: 'Sophia Doe',
    category: 'Marketing'
  }, {
    title: 'Enim eius nemo natus magnam sed dolor eveniet architecto molestiae',
    avatar: 'assets/images-demo/avatars/5.jpg',
    author: 'Luna Doe',
    category: 'Development'
  }
];

class Blog extends React.Component {
  state = {
    posts,
  };

  render() {
    return (
      <section className="page-blog container-fluid no-breadcrumb container-mw-md chapter">
        <QueueAnim type="bottom" className="ui-animate">
          {
            this.state.posts.map((post, i) => (
              <article className="blog-item" key={i.toString()}>
                <h2><a href={DEMO.link}>{post.title}</a></h2>
                <div className="blog-info">
                  <span><img src={post.avatar} alt="avatar" className="avatar" /></span>
                  <span><a href={DEMO.link} className="author">{post.author}</a></span>
                  <span className="date">10 June</span>
                  <span className="category"><a href={DEMO.link}>{post.category}</a></span>
                </div>
                <p className="desc">Consequuntur hic eum ab consequatur, veniam laudantium placeat pariatur numquam quo voluptatem velit, labore voluptas tempore temporibus vitae tenetur porro eligendi exercitationem fugiat ipsum in ullam. Necessitatibus laboriosam enim ea eos, eveniet corporis impedit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </article>
            ))
          }
        </QueueAnim>
      </section>
    );
  }
}

export default Blog;
