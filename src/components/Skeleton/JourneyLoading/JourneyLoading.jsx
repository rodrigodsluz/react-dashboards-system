import React from 'react';
import { FlexContent, Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function JourneyLoading() {
  return (
    <>
      <Spacing vertical="15px" />
      <FlexContent align="center" center>
        <Spacing vertical="5px" />
        <GenericSkeleton type="circle" width="50px" height="50px" />
        <Spacing vertical="5px" />
        <GenericSkeleton type="circle" width="50px" height="50px" />
        <Spacing vertical="5px" />
        <GenericSkeleton type="circle" width="50px" height="50px" />
        <Spacing vertical="5px" />
      </FlexContent>
    </>
  );
}

export default JourneyLoading;
