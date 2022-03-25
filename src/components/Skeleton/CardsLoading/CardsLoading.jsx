import React from 'react';
import { Spacing } from '@d1.cx/components';
import GenericSkeleton from '../Skeleton';

function CardsLoading() {
  return (
    <>
      <GenericSkeleton type="rect" width="340px" height="100px" />
      <Spacing vertical="5px" />
      <GenericSkeleton type="rect" width="340px" height="100px" />
      <Spacing vertical="5px" />
      <GenericSkeleton type="rect" width="340px" height="100px" />
    </>
  );
}

export default CardsLoading;
