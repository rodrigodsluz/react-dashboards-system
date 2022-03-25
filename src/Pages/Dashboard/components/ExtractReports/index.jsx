import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Modal from '../../../../components/Modal';
import ConfirmationContent from '../../../../components/ConfirmationContent';

import { useModal } from '../../../../hooks/useModal';

import { useStyles } from './styles';

const ExtractReports = ({ handleConfirm }) => {
  const { isShownModal, toggleModal } = useModal();
  const classes = useStyles();

  return (
    <>
      <Modal
        title="Gerar relatórios"
        open={isShownModal}
        handleClose={toggleModal}
        content={<ConfirmationContent messageOne="Confirmar a geração dos relatórios" />}
        confirm={handleConfirm}
      />
      <Box className={classes.box}>
        <Button size="small" color="primary" className={classes.button} onClick={toggleModal}>
          Extrair relatórios
        </Button>
      </Box>
    </>
  );
};

ExtractReports.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
};

export default ExtractReports;
