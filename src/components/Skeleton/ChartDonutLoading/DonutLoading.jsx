import React from 'react';
import { FlexContent, Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function DonutLoading() {
  return (
    <FlexContent direction="column">
      <GenericSkeleton type="circle" width="200px" height="200px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="300px" height="20px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="300px" height="20px" />
    </FlexContent>
  );
}

export default DonutLoading;
