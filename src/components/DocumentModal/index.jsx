/* eslint-disable react/prop-types */
import { Modal, PrimaryButton, Typography } from '@d1.cx/components';
import React from 'react';
import DocumentCard from '../DocumentCard';
import { Container, WrapperButton } from './styles';

const DocumentModal = ({
  open, handleClick, attachments, protocolNumber,
}) => (
  <Modal open={open} title={`Documentos associados ao protocolo ${protocolNumber}`}>
    <Container>
      {attachments?.length > 0 ? attachments?.map((elem) => (
        <DocumentCard attachment={elem} />
      )) : <Typography vertical="15px" bold fontSize="25px">Não há documentos!</Typography>}

    </Container>
    <WrapperButton>
      <PrimaryButton handleClick={() => handleClick(false)}>
        Fechar
      </PrimaryButton>
    </WrapperButton>
  </Modal>
);

export default DocumentModal;
