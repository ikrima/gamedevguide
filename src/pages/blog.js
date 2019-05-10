import React from 'react';
import { graphql } from 'gatsby';
// import Layout from '../components/Layout'
import MainLayout from '../components/main-layout';

import PostCard from '../components/PostCard';

const BlogPage = ({ data: { blogposts } }) => {
  const { edges } = blogposts;

  const posts = edges
    .map(({ node }) => (node.childMdx ? node.childMdx : node.childMarkdownRemark))
    .filter(node => !!node.frontmatter.date)
    .map(node => <PostCard key={node.id} post={node} />);

  return (
    <MainLayout hideSidebar>
      <div>{posts}</div>
    </MainLayout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    blogposts: allFile(
      filter: { ext: { in: [".md", ".mdx"] }, sourceInstanceName: { eq: "blogposts" } }
    ) {
      edges {
        node {
          childMdx {
            fields {
              slug
            }
            id
            excerpt(pruneLength: 250)
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
          }
          childMarkdownRemark {
            fields {
              slug
            }
            id
            excerpt(pruneLength: 250)
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
          }
        }
      }
    }
  }
`;
