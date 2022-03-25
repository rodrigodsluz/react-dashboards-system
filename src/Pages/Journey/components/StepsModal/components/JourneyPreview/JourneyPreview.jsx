/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';

import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { FlexContent, Typography } from '@d1.cx/components';
import { ArrowLeft } from '@d1.cx/icons';

import { dispatch } from '../../../../../../Config/store';
import LottieNotification from '../../../../../../components/LottieNotification/LottieNotification';
import Logo from '../../../../../../assets/workflow.png';
import {
  StepConnector,
  Container,
  Click,
  Body,
  Card,
  Wrapper,
  LogoClient,
} from './styles';
import StepIcon from '../../../../../../components/StepIcon';
import SnackAlert from '../../../../../../components/SnackAlert';
import DocumentModal from '../../../../../../components/DocumentModal';

const JourneyPreview = ({
  open, protocol, onClose, reset,
}) => {
  const [journey, setJourney] = useState({});
  const [activeStep, setActiveStep] = useState();
  const [attachments, setAttachments] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [openDocumentList, setOpenDocumentList] = useState(false);
  const [pendingItems, setPendingItems] = useState(false);
  const [inAnalisysItems, setInAnalisysItems] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const document = useSelector((state) => state.Document.uniqueDocument);

  const handleToggleDocumentList = () => {
    setOpenDocumentList(!openDocumentList);
  };

  const handleGetStepsByProtocol = useCallback(async () => {
    if (open && protocol.trim()) {
      setJourney({});
      try {
        await dispatch.Document.loadByProtocol(protocol);
      } catch (error) {
        setErrorMessage(
          'Não foi encontrada nenhuma jornada vinculada a esse protocolo',
        );
        setOpenNotification(true);
      }
    }
  }, [open]);

  const orderAttachmentsByStatus = (attach) => {
    if (attach) {
      const sortArray = attach.sort((a) => (a.status === 'pending' ? -1 : 1));

      return sortArray;
    }
  };

  const handleDocumentInfo = useCallback(() => {
    if (open && document) {
      setJourney(document?.journey);
      orderAttachmentsByStatus(document?.attachments);
      setAttachments(document.attachments);
    }
  }, [document, open]);

  const handleSetInfosInJourney = useCallback(() => {
    if (document && open) {
      const active = document
        ? document?.journey?.step.findIndex(
          (step) => step.id === document.currentStep.id,
        )
        : -1;
      setActiveStep(active);
    }
  }, [document, open]);

  const handleCheckPendingStatus = useCallback(() => {
    if (attachments) {
      const existingPending = attachments.filter(
        (elem) => elem.status === 'pending',
      );

      const existingAnalisys = attachments.filter(
        (elem) => elem.status === 'in_analisys',
      );

      setPendingItems(existingPending?.length > 0);
      setInAnalisysItems(existingAnalisys?.length > 0);
    }
  }, [attachments]);

  useEffect(() => {
    if (open) {
      handleSetInfosInJourney();
      handleDocumentInfo();
    }
  }, [document, open]);

  useEffect(() => {
    if (open) {
      handleGetStepsByProtocol();
    }
  }, [protocol, open]);

  useEffect(() => {
    if (open) {
      handleCheckPendingStatus();
    }
  }, [attachments, open]);

  return (
    <>
      {open ? (
        <Container>
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
            protocolNumber={protocol}
          />
          <Card>
            <Body>
              <FlexContent>
                <Click
                  data-testid="back-icon"
                  onClick={() => {
                    setJourney({});
                    onClose(false);
                    reset('');
                    dispatch.Document.resetDocumentAsync();
                  }}
                >
                  <ArrowLeft color="#575757" />
                </Click>
                <FlexContent direction="column">
                  <LogoClient
                    alt={process.env.REACT_APP_NAME || 'Workflow'}
                    src={process.env.REACT_APP_LOGO || Logo}
                  />
                  <Typography fontSize="25px" vertical="50px" horizontal="10px">
                    {journey?.name}
                  </Typography>
                  <Typography>
                    {journey?.name && (
                      activeStep !== -1
                        ? 'Clique no passo atual para ver os detalhes sobre os documentos.'
                        : 'O protocolo ainda não passou por nenhum dos status definidos na jornada'
                    )}

                  </Typography>
                </FlexContent>
              </FlexContent>
              {journey?.name === undefined && (
                <>
                  <Wrapper>
                    <LottieNotification
                      hiddenBg
                      animation="lupa"
                      description="Ops! Não há nenhuma jornada com esse protocolo."
                    />
                  </Wrapper>
                </>
              )}

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
      ) : null}
    </>
  );
};

export default JourneyPreview;
