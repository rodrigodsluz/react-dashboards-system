import React from 'react';
import { FlexContent, Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function TableLoading() {
  return (
    <FlexContent direction="column">
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="900px" height="40px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="900px" height="40px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="900px" height="40px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="900px" height="40px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="900px" height="40px" />
      <Spacing vertical="10px" />
      <GenericSkeleton type="text" width="900px" height="40px" />
    </FlexContent>
  );
}

export default TableLoading;
