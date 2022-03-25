import React, { useCallback } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  FlexContent,
  PrimaryButton,
  Spacing,
  Typography,
} from '@d1.cx/components';
import { OutlineButton } from './styles';

const AlertDialog = ({
  title,
  open,
  content,
  confirm,
  handleClose,
  successFlag,
}) => {
  const handleClick = useCallback(() => {
    confirm();
    handleClose();
  });
  return (
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

        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <FlexContent spaceAround>
            {!successFlag && (
              <OutlineButton onClick={handleClose}>
                Cancelar
              </OutlineButton>
            )}
            <PrimaryButton onClick={handleClick} color="primary" autoFocus>
              Confirmar
            </PrimaryButton>
          </FlexContent>

        </DialogActions>
        <Spacing vertical="5px" />

      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  title: '',
  successFlag: false,
};

AlertDialog.propTypes = {
  title: PropTypes.string,
  successFlag: PropTypes.bool,

  open: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
};

export default AlertDialog;
