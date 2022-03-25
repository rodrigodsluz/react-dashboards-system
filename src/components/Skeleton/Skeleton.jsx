import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

function GenericSkeleton({ type, width, height }) {
  return (
    <div>
      <Skeleton variant={type} width={width} height={height} />
    </div>
  );
}

GenericSkeleton.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default GenericSkeleton;
