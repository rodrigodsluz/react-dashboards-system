/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Typography } from '@d1.cx/components';

import {
  Container, ProtocolItem, ProtocolScroll, Row,
} from './styles';
import { LogoClient } from '../../styles';
import Logo from '../../../../../assets/workflow.png';
import { dispatch } from '../../../../../Config/store';
import SnackAlert from '../../../../../components/SnackAlert';

const ERROR_MESSAGE = 'Não há jornadas vinculadas a este protocolo.';
const SelectProtocol = ({ protocols, loading, handleClick }) => {
  const [openNotification, setOpenNotification] = useState(false);
  const [sortProtocols, setSortProtocols] = useState([]);
  const handleSortProtocolsByDesc = (value) => {
    if (value) {
      const sort = value.sort((a, b) => (a.id > b.id ? -1 : 1));
      setSortProtocols(sort);
    }
  };

  const handleSelectProtocol = async (value) => {
    try {
      await dispatch.Document.loadByProtocol(value);
      handleClick();
    } catch (error) {
      setOpenNotification(true);
    }
  };

  useEffect(() => {
    if (protocols.length) {
      handleSortProtocolsByDesc(protocols);
    }
  }, [protocols]);

  if (loading) {
    return (
      <Container>
        <LogoClient
          alt={process.env.REACT_APP_NAME || 'Workflow'}
          src={process.env.REACT_APP_LOGO || Logo}
        />
        <Row>
          <Typography bold fontSize="16px">
            Aguarde...
          </Typography>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <SnackAlert
        open={openNotification}
        severity="error"
        handleClose={() => setOpenNotification(false)}
        message={ERROR_MESSAGE}
      />
      <LogoClient
        alt={process.env.REACT_APP_NAME || 'Workflow'}
        src={process.env.REACT_APP_LOGO || Logo}
      />
      <Row>
        <Typography bold fontSize="16px">
          {!loading && !protocols
            ? 'Não há protocolos cadastrados nesse cpf'
            : 'Selecione o processo que deseja analisar'}
        </Typography>
      </Row>

      <ProtocolScroll>
        {protocols.length
          && sortProtocols?.map((protocol) => (
            <ProtocolItem
              onClick={() => handleSelectProtocol(protocol.protocol)}
            >
              <Typography bold>
                {protocol.protocol || 'Não informado'}
              </Typography>
            </ProtocolItem>
          ))}
      </ProtocolScroll>
    </Container>
  );
};

export default SelectProtocol;
