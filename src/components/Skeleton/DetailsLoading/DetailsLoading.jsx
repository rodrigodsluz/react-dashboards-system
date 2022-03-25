import React from 'react';
import { FlexContent, Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function DetailsLoading() {
  return (
    <FlexContent direction="column">
      <GenericSkeleton type="text" width="600px" height="40px" />

      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="600px" height="40px" />

    </FlexContent>
  );
}

export default DetailsLoading;
