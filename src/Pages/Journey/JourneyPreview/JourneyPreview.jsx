/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';

import { useSelector } from 'react-redux';
import queryString from 'query-string';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { FlexContent, Typography } from '@d1.cx/components';

import { useLocation } from 'react-router-dom';
import { dispatch } from '../../../Config/store';
import Logo from '../../../assets/workflow.png';

import {
  StepConnector,
  Container,
  Body,
  Wrapper,
  Box,
  LogoClient,
  Card,
} from './styles';
import LottieNotification from '../../../components/LottieNotification/LottieNotification';
import SelectProtocol from './components/SelectProtocol';
import SnackAlert from '../../../components/SnackAlert';
import DocumentModal from '../../../components/DocumentModal';
import StepIcon from '../../../components/StepIcon';

const JourneyPreview = () => {
  const { search } = useLocation();
  const { protocol, cpf } = queryString.parse(search);
  const [journey, setJourney] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [activeStep, setActiveStep] = useState();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openDocumentList, setOpenDocumentList] = useState(false);
  const [pendingItems, setPendingItems] = useState(false);
  const [inAnalisysItems, setInAnalisysItems] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [protocolNumber, setProtocolNumber] = useState('');

  const document = useSelector((state) => state.Document.uniqueDocument);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleDocumentList = () => {
    setOpenDocumentList(!openDocumentList);
  };
  const handleGetStepsByProtocolOrCPF = useCallback(async () => {
    setJourney({});
    setLoading(true);

    try {
      if (protocol?.length > 0) {
        await dispatch.Document.loadByProtocol(protocol);
      }
    } catch (error) {
      setErrorMessage(
        'Não foi encontrada nenhuma jornada vinculada a esse protocolo',
      );
      setOpenNotification(true);
    }
    try {
      if (!protocol) {
        if (cpf?.length > 0) {
          setOpen(true);
          const splitCPF = cpf.split('?')[0];
          const id = splitCPF.replace(/-/g, '');

          await dispatch.Document.loadDocumentoByCpfAsync({
            cpf: [id],
            categories: ['valid', 'pause', 'primary'],
          });
        }
      }
    } catch (error) {
      setErrorMessage(
        'Não foi encontrado nenhum step vinculado a esta jornada.',
      );
      setOpenNotification(true);
    }

    setLoading(false);
  }, [protocol, cpf]);

  const orderAttachmentsByStatus = (attach) => {
    if (attach) {
      const sortArray = attach.sort((a) => (a.status === 'pending' ? -1 : 1));

      return sortArray;
    }
  };

  const handleDocumentInfo = useCallback(() => {
    if (document) {
      setJourney(document.journey);
      orderAttachmentsByStatus(document.attachments);
      setAttachments(document.attachments);
      setProtocolNumber(document.protocol);
    }
  }, [document]);

  const handleSetInfosInJourney = useCallback(() => {
    if (document) {
      const active = document
        ? document?.journey?.step.findIndex(
          (step) => step.id === document.currentStep.id,
        )
        : -1;
      setActiveStep(active);
    }
  }, [document]);

  const handleCheckPendingStatus = useCallback(() => {
    if (attachments) {
      const existingPending = attachments.filter(
        (elem) => elem.status === 'pending',
      );

      const existingAnalisys = attachments.filter(
        (elem) => elem.status === 'in_analisys',
      );

      setPendingItems(existingPending.length > 0);
      setInAnalisysItems(existingAnalisys.length > 0);
    }
  }, [attachments]);

  useEffect(() => {
    handleSetInfosInJourney();
    handleDocumentInfo();
  }, [document]);

  useEffect(() => {
    handleGetStepsByProtocolOrCPF();
  }, [protocol, cpf]);

  useEffect(() => {
    handleCheckPendingStatus();
  }, [attachments]);

  if (open) {
    return (
      <SelectProtocol
        protocols={document}
        loading={loading}
        handleClick={handleToggle}
      />
    );
  }

  if (loading) {
    return (
      <Typography bold fontSize="16px">
        Aguarde...
      </Typography>
    );
  }

  return (
    <>
      <SnackAlert
        open={openNotification}
        severity="error"
        handleClose={() => setOpenNotification(false)}
        message={errorMessage}
      />

      <DocumentModal
        open={openDocumentList}
        handleClick={setOpenDocumentList}
        attachments={attachments}
        protocolNumber={protocolNumber}
      />
      {journey && journey.name ? (
        <>
          <Container>
            <Card>
              <LogoClient
                alt={process.env.REACT_APP_NAME || 'Workflow'}
                src={process.env.REACT_APP_LOGO || Logo}
              />
              <Body>
                <FlexContent direction="column">
                  <Typography
                    fontSize="25px"
                    bold
                    vertical="50px"
                    horizontal="10px"
                  >
                    {' '}
                    {journey?.name}
                  </Typography>

                  <Typography>
                    {activeStep !== -1
                      ? 'Clique no passo atual para ver os detalhes sobre os documentos.'
                      : 'O protocolo ainda não passou por nenhum dos status definidos na jornada'}
                  </Typography>
                </FlexContent>

                <Box>
                  <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<StepConnector />}
                  >
                    {journey?.step?.map((step, index) => (
                      <Step key={step.id}>
                        <StepLabel
                          StepIconComponent={StepIcon}
                          StepIconProps={{
                            index: index + 1,
                            pending: pendingItems,
                            in_analisys: inAnalisysItems,
                            handleClick: handleToggleDocumentList,
                            activeStep,
                          }}
                        >
                          {step.name}
                        </StepLabel>
                        <Typography fontSize="13px" align="center">
                          {step?.agent ?? ''}
                        </Typography>
                        <Typography fontSize="13px" color="#ccc" align="center">
                          {index === activeStep
                            ? document?.lastUpdate
                            : step.updated_at}
                        </Typography>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Body>
            </Card>
          </Container>
        </>
      ) : (
        <Wrapper>
          <LottieNotification
            hiddenBg
            animation="lupa"
            description="Ops! Não há nenhuma jornada com esse protocolo."
          />
        </Wrapper>
      )}
    </>
  );
};

export default JourneyPreview;
