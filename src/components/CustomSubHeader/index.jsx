import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { ArrowLeft } from '@d1.cx/icons';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { useStyles, Wrapper } from './styles';

const CustomSubHeader = ({
  pageTitle, showBackButton, content, backRoute,
}) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <Box
        style={{
          display: 'inline-block',
          padding: '20px',
        }}
      >
        <Box className={classes.innerContainer}>
          {showBackButton && (
            <Link
              data-testid="back-icon"
              to={{
                pathname: backRoute,
                state: { name: 'Processos' },
              }}
            >
              <Tooltip title="voltar">
                <ArrowLeft width="30px" color="#000" />
              </Tooltip>
            </Link>
          )}
          <Typography color="inherit" className={classes.pageTitle}>
            {pageTitle}
          </Typography>
        </Box>
      </Box>
      {content}
    </Wrapper>
  );
};

CustomSubHeader.defaultProps = {
  backRoute: '',
  showBackButton: false,
};

CustomSubHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  content: PropTypes.shape({}).isRequired,
  showBackButton: PropTypes.bool,
  backRoute: PropTypes.string,
};

export default CustomSubHeader;
