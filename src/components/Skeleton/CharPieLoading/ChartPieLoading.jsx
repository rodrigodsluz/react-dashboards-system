import React from 'react';
import { FlexContent, Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function CharPieLoading() {
  return (
    <FlexContent direction="column">
      <Spacing vertical="5px" />
      <GenericSkeleton type="text" width="300px" height="50px" />
      <Spacing vertical="5px" />
      <GenericSkeleton type="text" width="300px" height="20px" />
      <Spacing vertical="5px" />
      <GenericSkeleton type="circle" width="150px" height="150px" />

    </FlexContent>
  );
}

export default CharPieLoading;
