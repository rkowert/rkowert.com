import React from 'react';

import type { OtherPublication as OtherPublicationType } from 'types/cv';

import Publication from './Publication';

interface Props {
  publication: OtherPublicationType;
}

export default function OtherPublication({
  publication: { authors, date, publication, title, url },
}: Props) {
  const authorsMarkup = authors.replace(/\.$/, '');
  const titleMarkup = url ? <a href={url}>{title}</a> : title;

  return (
    <span>
      {authorsMarkup}. ({date}). {titleMarkup}.{' '}
      <Publication publication={publication} />
    </span>
  );
}
