import React from 'react';

import PropTypes from 'prop-types';

import Theme from '../../theme';

const Badge = ({
  content, textColor, backgroundColor,
}) => (
  <>
    <span style={{
      display: 'inline-block',
      padding: '.4em',
      minWidth: '128px',
      fontSize: '90%',
      borderRadius: '30px',
      fontWeight: 400,
      color: textColor,
      backgroundColor,
      textAlign: 'center',
    }}
    >
      {content}
    </span>
  </>
);

Badge.defaultProps = {
  // textSize: 12,
  textColor: Theme.palette.text.light,
  backgroundColor: Theme.palette.primary.main,
};

Badge.propTypes = {
  content: PropTypes.string.isRequired,
  // textSize: PropTypes.number,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Badge;
