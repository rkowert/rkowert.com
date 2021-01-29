import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { rhythm } from 'utils/typography';

import {
  About,
  BookExcerpt,
  Layout,
  Profile,
  SEO,
  YoutubeVideo,
  Welcome,
} from 'components';

/* 3.06rem + 16rem + 3.06rem + 30rem + 3.06rem = 57.18rem */
const HelloSection = styled.section`
  margin: 0 auto;
  max-width: 70rem;

  @media (min-width: 48em) {
    display: grid;
    grid-gap: ${rhythm(2)};
    grid-template-columns: 16rem minmax(min-content, 50rem);
    grid-template-rows: min-content 1fr;
    grid-template-areas:
      'Profile Welcome'
      'Main Main';
  }

  @media (min-width: 60em) {
    grid-row-gap: 0;
    grid-template-areas:
      'Profile Welcome'
      'Profile Main';
  }
`;

const StyledProfile = styled(Profile)`
  grid-area: Profile;
`;

const StyledWelcome = styled(Welcome)`
  grid-area: Welcome;
`;

const Main = styled.div`
  grid-area: Main;
  margin-bottom: ${rhythm(2)};
`;

const AboutSection = styled.section`
  padding: ${rhythm(2)} 0;
  position: relative;

  &::before {
    background: ${(props) => props.theme.stripedSections.backgroundColor};
    content: '';
    position: absolute;
    width: 200vw;
    height: 100%;
    left: -100vw;
    top: 0;
    z-index: -1;
  }

  &::after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
  }
`;

const BooksSection = styled.section`
  padding: ${rhythm(2)} 0;
  margin: 0 auto;
  max-width: 60rem;
`;

const BooksGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3.06rem;
  margin-bottom: ${rhythm(2)};

  & > div {
    grid-column: 1 / span 2;

    @media (min-width: 48em) {
      grid-column: auto;
    }
  }
`;

const BookSpotlightVideo = styled(YoutubeVideo)`
  margin-bottom: ${rhythm(2)};
`;

const Home: React.FC = ({
  data: {
    allImageSharp: { edges: images },
    booksQuery: { edges: books },
    postsQuery: { edges: posts },
  },
}): React.ReactElement => (
  <Layout>
    <SEO
      title="Home"
      keywords={['rachel', 'kowert', 'psychology', 'gaming', 'psychgeist']}
    />
    <main>
      <HelloSection>
        <StyledProfile />
        <StyledWelcome />
        <Main>
          <p>
            For more on the psychology of games, please visit my YouTube
            channel: <a href="https://youtube.com/c/Psyhgeist">Psychgeist</a>.
          </p>
          <YoutubeVideo videoId="LpCuWV_BD38" />
        </Main>
      </HelloSection>
      <AboutSection>
        <About />
      </AboutSection>
      <BooksSection>
        <h2>Books</h2>
        <BookSpotlightVideo videoId="-GRfL_jlyjw" />

        <h3>Latest books</h3>
        <BooksGrid>
          {books.map(({ node }) => {
            const img = images.find(
              ({ node: { fluid: image } }) =>
                image.originalName === node.frontmatter.cover
            );
            const book = {
              ...node,
              coverImage: img ? img.node : null,
              path: node.fields.path,
              slug: node.fields.slug,
            };

            return <BookExcerpt book={book} key={book.id} />;
          })}
        </BooksGrid>
        <p>
          For the full catalog, please visit the <Link to="/books">Books</Link>{' '}
          page.
        </p>
      </BooksSection>
      <section className="Media" />
      <section className="Contact" />
    </main>
  </Layout>
);

export default Home;

export const pageQuery = graphql`
  query {
    allImageSharp(filter: { fields: { collection: { eq: "images" } } }) {
      edges {
        node {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            originalName
          }
        }
      }
    }
    booksQuery: allMarkdownRemark(
      filter: { fields: { collection: { eq: "books" } } }
      limit: 4
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(format: HTML, pruneLength: 250)
          id
          fields {
            path
            slug
          }
          frontmatter {
            cover
            date(formatString: "MMMM DD, YYYY")
            subtitle
            title
          }
        }
      }
    }
    postsQuery: allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog-posts" } } }
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(format: HTML, pruneLength: 350)
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
