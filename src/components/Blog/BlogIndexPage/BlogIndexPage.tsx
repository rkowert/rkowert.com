import * as React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { BlogPage, BlogPostExcerpt, Layout, SEO } from 'components';
import { getBlogIndexPagePath } from 'utils/helpers';
import { BlogPost } from 'types';

interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        node: BlogPost;
      }[];
    };
  };
  pageContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
    // previousPagePath: string;
    // nextPagePath: string;
  };
}

const BlogPagination = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  & a {
    max-width: 40%;

    &[rel='next'] {
      margin-left: auto;
      text-align: right;
    }
  }
`;

export default function BlogIndexPage({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext,
}: Props) {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = getBlogIndexPagePath(currentPage - 1);
  const nextPage = getBlogIndexPagePath(currentPage + 1);
  const posts = edges.map((edge) => (
    <BlogPostExcerpt key={edge.node.id} post={edge.node} />
  ));
  const title = `${isFirst ? '' : `Page ${currentPage} | `}Blog`;

  return (
    <Layout>
      <SEO title={title} />
      <BlogPage>
        <main>
          {posts}
          <BlogPagination aria-label="Blog pagination">
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                <FaArrowLeft aria-hidden="true" /> Previous Page
              </Link>
            )}
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page <FaArrowRight aria-hidden="true" />
              </Link>
            )}
          </BlogPagination>
        </main>
      </BlogPage>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogIndexPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog-posts" } } }
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(format: HTML, pruneLength: 250)
          fields {
            path
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          timeToRead
        }
      }
    }
  }
`;
