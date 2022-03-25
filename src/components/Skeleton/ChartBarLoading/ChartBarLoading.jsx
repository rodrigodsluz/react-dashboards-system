import React from 'react';
import { FlexContent, Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function ChartBarLoading() {
  return (
    <FlexContent>
      <Spacing horizontal="5px" />
      <GenericSkeleton type="rect" width="20px" height="400px" />
      <Spacing horizontal="5px" />
      <GenericSkeleton type="rect" width="20px" height="400px" />
      <Spacing horizontal="5px" />
      <GenericSkeleton type="rect" width="20px" height="400px" />
      <Spacing horizontal="5px" />
      <GenericSkeleton type="rect" width="20px" height="400px" />
      <Spacing horizontal="5px" />
      <GenericSkeleton type="rect" width="20px" height="400px" />
      <Spacing horizontal="5px" />
      <GenericSkeleton type="rect" width="20px" height="400px" />
      <Spacing horizontal="5px" />
    </FlexContent>
  );
}

export default ChartBarLoading;
