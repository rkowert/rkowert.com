import * as React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { AmazonBuyButton, BookReview, IndieboundBuyButton } from 'components';
import { Book as BookType } from 'types';
import { rhythm } from 'utils/typography';

interface Props {
  book: BookType;
}

const Book = styled.div`
  margin-bottom: ${rhythm(2)};
  padding-top: ${rhythm(1)};
`;

const CoverAndBuy = styled.div`
  margin: 0 0 ${rhythm(1)};

  @media (min-width: 36em) {
    float: right;
    margin: 0 0 ${rhythm(1)} ${rhythm(1)};
  }
`;

const BookCover = styled.div`
  margin: 0 auto ${rhythm(1 / 2)};
  max-width: 20em;

  @media (min-width: 36em) {
    margin-bottom: 0 0 ${rhythm(1 / 2)};
    max-width: auto;
  }
`;

const BuyButtons = styled.p`
  display: flex;
  flex-flow: row wrap;
  margin: ${rhythm(1)} 0 0;

  & a {
    margin-right: ${rhythm(1 / 2)};

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Title = styled.h2`
  font-weight: 800;
`;

const Subtitle = styled.h3`
  color: ${(props) => props.theme.color.text.subdued};
  font-family: 'Muli', sans-serif;
  font-style: italic;
  font-weight: 300;
`;

export default function ({ book }: Props) {
  const {
    coverImage,
    frontmatter: { productId, reviews, subtitle, title },
  } = book;

  return (
    <Book>
      <Title>{title}</Title>
      <div>
        <CoverAndBuy>
          {coverImage && (
            <BookCover>
              <Img fluid={coverImage.fluid} alt={`Cover of book, ${title}`} />
            </BookCover>
          )}
          <BuyButtons>
            {productId && productId.indiebound && (
              <IndieboundBuyButton productId={productId.indiebound} />
            )}
            {productId && productId.amazon && (
              <AmazonBuyButton productId={productId.amazon} />
            )}
          </BuyButtons>
        </CoverAndBuy>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {reviews.length > 0 &&
          reviews.map((review) => (
            <BookReview review={review} key={review.author} />
          ))}
        <div
          dangerouslySetInnerHTML={{
            __html: book.html,
          }}
        />
      </div>
    </Book>
  );
}
