/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Spacing,
  Typography,
} from '@d1.cx/components';

const MultileModal = ({
  title,
  open,
  primaryContent,
  handleClose,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="dialog" style={{ textAlign: 'left' }}>
        <Typography fontSize="13px" bold color="#9196ab">
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        { primaryContent }
      </DialogContent>

      <Spacing vertical="5px" />
    </Dialog>
  </div>
);

MultileModal.defaultProps = {
  title: '',
};

MultileModal.propTypes = {
  title: PropTypes.string,

  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  primaryContent: PropTypes.shape({}).isRequired,
};

export default MultileModal;
