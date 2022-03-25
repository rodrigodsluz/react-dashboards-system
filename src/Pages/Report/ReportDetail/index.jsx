/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import TabList from '@material-ui/lab/TabList';
import { TrashAlt, Bars } from '@d1.cx/icons';
import ImageIcon from '@material-ui/icons/Image';

import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import { Icon } from 'rsuite';

import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';

import {
  PrimaryButton,
  Typography,
} from '@d1.cx/components';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DescriptionIcon from '@material-ui/icons/Description';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'save-as';
import LottieNotification from '../../../components/LottieNotification/LottieNotification';
import DetailsLoading from '../../../components/Skeleton/DetailsLoading/DetailsLoading';
import SnackAlert from '../../../components/SnackAlert';
import CustomAutocomplete from '../../../components/CustomAutocomplete';
import { useModal } from '../../../hooks/useModal';

import store, { dispatch } from '../../../Config/store';

import DocumentCard from './components/DocumentCard';

import Modal from '../../../components/Modal';
import Badge from '../../../components/Badge';
import CardsLoading from '../../../components/Skeleton/CardsLoading/CardsLoading';

import DropzoneModal from '../../../components/DropzoneModal';
import CustomSubHeader from '../../../components/CustomSubHeader';
import ConfirmationContent from '../../../components/ConfirmationContent';
import colors from '../../../theme/colors';
import BoxCard from './components/BoxCard/BoxCard';
import AttachmentModal from '../../../components/AttachmentModal';
import { useAttachModal } from '../../../hooks/useAttachmentModal';

import {
  useStyles,
  DetailsContainer,
  MainContainer,
  SubHeaderWrapper,
  TimelineBtn,
  DocumentCardsColumn,
  ColumnTitle,
  DocumentBtns,
  DocumentTitle,
  DropdownContainer,
  TabsContainer,
  MessagesContainer,
  MessageItems,
  TabsWrapper,
  DocumentCardsContainer,
  InputFieldContainer,
  TextFieldContainer,
  ObservationsDate,
  DateAndDoubleTickContainer,
  TabListContainer,
  DoubleTickIcon,
  MessageDate,
  CardMessagesContainer,
  InputMessageContainer,
  EmptyMessages,
  DeleteBtn,
  MessagesWrapper,
  InputButtonsContainer,
  AttachmentButton,
  SubHeaderItems,
  ChangeStatusOrOperatorContainer,
  StyledLink,
  DetailsLoadingContainer,
  TabLabel,
  Drop,
  ProtocolLabel,
  BadgeContainer,
  Row,
} from './styles';

import { prepareDataToDisplay } from '../../../utils/preparesDataToDisplay';

/**
 * @function ReportDetail
 * @description Página de detalhes dos relatórios, contendo informações,
 * cards com documentos e um local para mensagens de retorno ao solicitante ou
 * observações internas
 */
const ReportDetail = () => {
  const { idDocument } = useParams();

  const [statusValue, setStatusValue] = useState('');
  const [operatorValue, setOperatorValue] = useState('');
  const [modalityValue, setModalityValue] = useState();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messageConfirmation, setMessageConfirmation] = useState('');

  const [messageTitle, setMessageTitle] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [openModalDropzone, setOpenModalDropzone] = useState(false);
  const [openSubmitModalDropzone, setOpenSubmitModalDropzone] = useState(false);
  const [attachmentData, setAttachmentData] = useState({});
  const [attachmentCard, setAttachmentCard] = useState({});
  const [customerFormData, setCustomerFormData] = useState({});
  const [openModalConfirmMessage, setOpenModalConfirmMessage] = useState(false);

  const [sortedObservations, setSortedObservation] = useState([]);

  const [boxesData, setBoxesData] = useState([]);

  const [sortedAttachments, setSortedAttachments] = useState([]);
  const [open, setOpen] = useState(false);

  const [path, setPath] = useState('');
  const [fileName, setFileName] = useState('');

  const [newDocument, setNewDocument] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState('');
  const classes = useStyles();
  const formRef = useRef(null);
  const formRefInternalObservation = useRef(null);

  const { isShownModal, toggleModal } = useModal();
  const [attachmentStatus, setAttachmentStatus] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [TabOnevalue, setTabOneValue] = useState('1');
  const [errorAPI, setErrorAPI] = useState(false);

  const [loading, setLoading] = useState(false);

  const document = useSelector(
    (state) => state.Document.uniqueDocument,
    shallowEqual,
  );

  const status = useSelector((state) => state.Status.allState, shallowEqual);
  const usersList = useSelector((state) => state.User.userList);
  const modalities = useSelector((state) => state.Modalities.modalities);
  const { isShownAttachModal, toggleAttachModal } = useAttachModal();

  useEffect(() => {
    const loadStatusById = async () => {
      try {
        await dispatch.Document.loadDocumentByIdAsync(idDocument);
        const Store = await store.getState();
        await dispatch.Status.loadStatusByProductAsync(
          Store?.Document?.uniqueDocument?.product_id,
        );
        await dispatch.User.loadAllUsersAsync();
        await dispatch.Modalities.resetModalitiesAsync();
        await dispatch.Modalities.loadModalitiesByproductAsync(
          Store?.Document?.uniqueDocument?.product_id,
        );
      } catch (error) {
        setErrorAPI(true);
      }
    };

    if (idDocument) loadStatusById();
  }, [idDocument]);

  const handleConfirmModality = useCallback((_event, value) => {
    if (value) {
      setModalityValue(value);
      setTitle('Alteração de esteira');
      setMessage(
        'Com está ação você irá alterar a esteira, deseja prosseguir?',
      );
      toggleModal();
      setShowAutoComplete('');
    }
  }, []);

  useEffect(() => {
    const formattedData = [];

    if (document?.id) {
      if (document.hasOwnProperty('fields_to_show')) {
        if (Object.entries(document.fields_to_show).length > 0) {
          formattedData.push(
            prepareDataToDisplay(document.fields_to_show, 'Geral'),
          );
        }
      }

      if (document.hasOwnProperty('filled_columns')) {
        if (Object.entries(document.filled_columns).length > 0) {
          formattedData.push(
            prepareDataToDisplay(document.filled_columns, 'Detalhes'),
          );
        }
      }
    }

    setBoxesData(formattedData.flat(1));
  }, [document]);

  useEffect(() => {
    if (document?.id) {
      const observationSorted = document.observation;
      setSortedObservation(observationSorted);
    }
  }, [document]);

  useEffect(() => {
    if (document?.id) {
      const attachmentSorted = document.attachment.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      setSortedAttachments(attachmentSorted);
    }
  }, [document]);

  const handleToggleModalDropzone = useCallback(() => {
    setOpenModalDropzone(!openModalDropzone);
  }, [openModalDropzone]);

  const handleCloseModalDropzone = useCallback(() => {
    setSelectedFile({});
    setOpenModalDropzone(!openModalDropzone);
  }, [selectedFile, openModalDropzone]);

  const handleCloseSubmitModalDropzone = useCallback(() => {
    setSelectedFile({});
    setOpenSubmitModalDropzone(!openSubmitModalDropzone);
  }, [selectedFile, openSubmitModalDropzone]);

  const handleCloseModalConfirmCustomerReturn = useCallback(() => {
    setOpenModalConfirmMessage(!openModalConfirmMessage);
  }, [openModalConfirmMessage]);

  const handleChangeTabOne = (_event, newValue) => {
    setTabOneValue(newValue);
  };

  /**
   * @function handleConfirmStatus
   * @description Abre o modal para confirmar a alteração do status
   */
  const handleConfirmStatus = useCallback((_event, value) => {
    const res = status.find((sta) => sta.status === value);
    if (res) {
      setTitle('Alteração de status');
      setMessage(
        res.hasTransition
          ? 'Ao alterar o status você dispara comunicação, deseja prosseguir?'
          : 'Deseja prosseguir com a alteração de status?',
      );
      setStatusValue(res.id);
      toggleModal();
      setShowAutoComplete('');
    }
  });

  /**
   * @function handleConfirmOperator
   * @description Abre o modal para confirmar a alteração do operador
   */
  const handleConfirmOperator = useCallback((_event, value) => {
    if (value) {
      setOperatorValue(value);
      setTitle('Alteração de operador');
      setMessage(
        'Com está ação você irá alterar o operador, deseja prosseguir?',
      );
      toggleModal();
      setShowAutoComplete('');
    }
  }, []);

  /**
   * @function handleConfirmChanges
   * @description Confirma a alteração do operador ou status
   */
  const handleConfirmChanges = useCallback(async () => {
    let data;
    if (operatorValue) {
      const res = usersList.find((user) => user.name === operatorValue);
      data = { id: idDocument, user_id: res.id };
    }
    if (statusValue) {
      data = { id: idDocument, status_id: statusValue };
    }
    if (modalityValue) {
      data = { id: idDocument, modality_identifier: modalityValue };
    }

    try {
      await dispatch.Document.updateDocumentByIdAsync(data);
      await dispatch.Document.loadDocumentByIdAsync(idDocument);
    } catch (error) {
      setErrorAPI(true);
    }
  }, [usersList, operatorValue, statusValue, modalityValue, status]);

  /**
   * @function handleToggleModalConfirmMessage
   * @description Abre o modal de confirmação para retorno ou observação
   */
  const handleToggleModalConfirmMessage = useCallback(
    (formData) => {
      setCustomerFormData(formData);
      setOpenModalConfirmMessage(!openModalConfirmMessage);
    },
    [openModalConfirmMessage],
  );

  /**
   * @function handleSubmitMessage
   * @description Confirma a mensagem de retorno ou observação
   */

  const handleSubmitMessage = useCallback(async () => {
    try {
      if (messageTitle === 'Adicionar retorno ao solicitante') {
        formRef.current.reset();
        handleToggleModalConfirmMessage();
        const observationData = {};
        if (customerFormData.customerReturn) {
          observationData.section = 'section';
          observationData.document_id = idDocument;
          observationData.send_communication = true;
          observationData.observation_from = 'client';
          observationData.message = customerFormData.customerReturn;
          observationData.attachment_name = attachmentData?.name;
          await dispatch.Observation.createObservationAsync(observationData);

          if (attachmentData) {
            attachmentData.send_attachment = true;
          }

          if (selectedFile) {
            await dispatch.Attachment.addAttachmentAsync({
              idDocument,
              file: selectedFile,
              data: attachmentData,
            });
          }
        }
        setAttachmentData(null);

        setSelectedFile(null);
        await dispatch.Document.loadDocumentByIdAsync(idDocument);
      } else {
        formRefInternalObservation.current.reset();
        const observationData = {};
        if (customerFormData.internalObservation) {
          observationData.document_id = idDocument;
          observationData.section = 'section';
          observationData.message = customerFormData.internalObservation;
          observationData.send_communication = false;
          observationData.observation_from = 'internal';
          await dispatch.Observation.createObservationAsync(observationData);
        }
        await dispatch.Document.loadDocumentByIdAsync(idDocument);
      }
    } catch (error) {
      setErrorAPI(true);
    }
  }, [attachmentData, customerFormData, selectedFile]);

  /**
   * @function handleDeleteObservation
   * @description Deleta as observações
   */
  const handleDeleteObservation = useCallback(async (obs) => {
    const data = { id: obs.id };

    try {
      await dispatch.Observation.deleteObservationByIdAsync(data);
      await dispatch.Document.loadDocumentByIdAsync(idDocument);
    } catch (error) {
      setErrorAPI(true);
    }
  }, []);

  /**
   * @function handleSubmitAttachment
   * @description Salva os arquivos anexos
   */
  const handleSubmitAttachment = useCallback(
    async (data) => {
      setLoading(true);
      try {
        if (!newDocument) {
          const pendencies = [];
          const send_to_sac = true;
          data.document_id = idDocument;
          pendencies.push(data);
          await dispatch.Attachment.addNewAttachmentPendencyAsync({
            pendencies,
            send_to_sac,
          });
        } else {
          await dispatch.Attachment.addAttachmentAsync({
            file: selectedFile,
            idDocument,
            data,
          });
        }
        setSelectedFile({});
        setAttachmentStatus(true);
        setOpen(true);
        await dispatch.Document.loadDocumentByIdAsync(idDocument);
      } catch (error) {
        setAttachmentStatus(false);
        setOpen(true);
      } finally {
        setLoading(false);
        setOpenSubmitModalDropzone(!openSubmitModalDropzone);
      }
    },
    [selectedFile, newDocument, openSubmitModalDropzone, loading],
  );

  /**
   * @function handleSubmitClientAttachment
   * @description Salva os arquivos anexos do retorno do cliente
   */
  const handleSubmitClientAttachment = useCallback((formData) => {
    setAttachmentData(formData);
    setOpenModalDropzone(false);
  }, []);

  /**
   * @function handleClick
   * @description Ativa o menu de hamburguer dos botões
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * @function handleClose
   * @description Fecha o menu de hamburguer dos botões
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * @function handleSnackClose
   * @description Fecha o alerta
   */
  const handleSnackClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  /**
   * @function getSelectedFileIcon
   * @description Muda o ícone do arquivo em anexo selecionado no input
   */
  const getSelectedFileIcon = () => {
    let file = <AttachFileIcon />;

    if (selectedFile) {
      switch (selectedFile?.type && selectedFile?.type?.split('/')[0]) {
        case 'application':
          if (selectedFile.type.split('/')[1] === 'pdf') {
            file = (
              <img
                src="https://campanhasmail.azurewebsites.net/images/workflow/black-pdf-icon.png"
                alt="PDF Icon"
                style={{ width: '30px', height: '33px' }}
              />
            );
          } else {
            file = <DescriptionIcon fontSize="large" />;
          }
          break;

        case 'image':
          file = <ImageIcon fontSize="large" />;
          break;

        case '':
          file = <DescriptionIcon fontSize="large" />;
          break;

        default:
          file = <AttachFileIcon />;

          break;
      }
    }

    return file;
  };

  /**
   * @function getClientFileIcon
   * @description Muda o ícone do arquivo em anexo selecionado nas mensagens
   * do retorno dos clientes
   */
  const getClientFileIcon = (clientFileName) => {
    let file;

    const filenames = sortedAttachments.filter(
      (attachment) => attachment.name === clientFileName,
    );

    switch (filenames[0]?.filename?.split('.')[1]) {
      case 'pdf':
        file = (
          <img
            src="https://campanhasmail.azurewebsites.net/images/workflow/pdf-icon.png"
            alt="PDF Icon"
            style={{ width: '15px', height: '18px' }}
          />
        );
        break;

      case 'png' || 'gif' || 'jpg' || 'jpeg' || 'webp' || 'bmp':
        file = <ImageIcon fontSize="small" />;

        break;

      default:
        file = <DescriptionIcon fontSize="small" />;

        break;
    }

    return file;
  };

  /**
   * @function handleMessageTitle
   * @description Muda a mensagem e o título do modal de mensagem
   */
  const handleMessageTitle = (titleMessage, confirmationMessage) => () => {
    setMessageTitle(titleMessage);
    setMessageConfirmation(confirmationMessage);
  };

  /**
   * @function handleAddDocument
   * @description Adiciona o documento
   */
  const handleAddDocument = useCallback(() => {
    setNewDocument(true);
    setOpenSubmitModalDropzone(true);
  }, [openSubmitModalDropzone]);

  /**
   * @function handleAddPendency
   * @description Adiciona a pendência
   */
  const handleAddPendency = useCallback(() => {
    setNewDocument(false);
    setOpenSubmitModalDropzone(true);
  }, [openSubmitModalDropzone]);

  /**
   * @function handleDownloadAllFilesButton
   * @description Faz o download de um zip com todos os documentos de uma vez
   */
  const handleDownloadAllFilesButton = () => {
    if (document) {
      const paths = document.attachment.filter((e) => e.path !== '');
      const filenames = document.attachment.filter((e) => e.key !== null);

      const zip = new JSZip();
      let count = 0;
      const zipFilename = 'documentos.zip';
      paths.forEach(async (url, i) => {
        try {
          const file = await JSZipUtils.getBinaryContent(url.path);
          zip.file(filenames[i].key.replace('file/', ''), file, {
            binary: true,
          });
          count += 1;
          if (count === paths.length) {
            zip.generateAsync({ type: 'blob' }).then((content) => {
              saveAs(content, zipFilename);
            });
          }
        } catch (err) {
          console.warn(err);
        }
      });
    }
  };

  /**
   * @function handleDownloadAllFilesButton
   * @description Faz o download de um zip com todos os documentos de uma vez
   */
  const handleDocumentCard = (attachment) => {
    setAttachmentCard(attachment);

    setPath(attachment.path);
    setFileName(attachment.name);

    if (attachment.path) {
      toggleAttachModal();
    }
  };

  const handleCloseNotification = useCallback(() => {
    setErrorAPI(false);
  }, [errorAPI]);

  return (
    <>
      <AttachmentModal
        title={fileName}
        path={path}
        show={isShownAttachModal}
        handleConfirm={() => {}}
        attachment={attachmentCard}
        boxesData={boxesData}
        protocol={document?.protocol}
        toggleAttachModal={toggleAttachModal}
      />

      <SnackAlert
        open={errorAPI}
        handleClose={handleCloseNotification}
        severity="error"
        message="Ops! Não foi possivel encontrar os dados. Verifique sua conexão e tente novamente."
      />
      {/** confirm status/operator change modal */}
      <Modal
        title={title}
        open={isShownModal}
        handleClose={() => {
          setStatusValue('');
          setOperatorValue('');
          setModalityValue('');
          return toggleModal();
        }}
        content={<ConfirmationContent messageOne={message} />}
        confirm={handleConfirmChanges}
      />
      {/** end confirm status/operator change modal */}
      {/** confirm customer return */}
      <Modal
        title={messageTitle}
        open={openModalConfirmMessage}
        handleClose={handleCloseModalConfirmCustomerReturn}
        content={<ConfirmationContent messageOne={messageConfirmation} />}
        confirm={handleSubmitMessage}
      />
      {/** end confirm customer return */}
      {/** add client attachment modal */}
      <DropzoneModal
        open={openModalDropzone}
        addDocument
        setSelectedFile={setSelectedFile}
        handleClose={handleCloseModalDropzone}
        onSubmitFunction={handleSubmitClientAttachment}
      />
      {/** end add client attachment modal */}
      {/** add attachment modal */}
      <DropzoneModal
        open={openSubmitModalDropzone}
        addDocument={newDocument}
        setSelectedFile={setSelectedFile}
        handleClose={handleCloseSubmitModalDropzone}
        onSubmitFunction={handleSubmitAttachment}
        loading={loading}
      />
      {/** end attachment modal */}
      {/* * Alerts - show success or failure when adding an attachment or pendency  */}
      {attachmentStatus ? (
        <SnackAlert
          open={open}
          handleClose={handleSnackClose}
          severity="success"
          message={
            newDocument ? 'Documento adicionado!' : 'Pendência adicionada!'
          }
        />
      ) : (
        <SnackAlert
          open={open}
          handleClose={handleSnackClose}
          severity="error"
          message={
            newDocument
              ? 'Erro ao adicionar documento!'
              : 'Erro ao adicionar pendência!'
          }
        />
      )}
      {/* End Alerts - show success or failure when adding an attachment or pendency  */}

      <DetailsContainer>
        <MainContainer>
          <CustomSubHeader
            showBackButton
            backRoute="/reports"
            content={(
              <SubHeaderItems>
                {document ? (
                  <>
                    <div>
                      <>
                        <ProtocolLabel>
                          <Typography fontSize="21px" vertical="10px">
                            {document.protocol}
                          </Typography>
                        </ProtocolLabel>

                        <SubHeaderWrapper>
                          <BadgeContainer>
                            <Badge
                              content={document?.status.name}
                              textColor={document.status.styles.color}
                              backgroundColor={
                                document.status.styles.backgroundColor
                              }
                            />
                          </BadgeContainer>

                          <DropdownContainer testID="dropdownAlteration">
                            <Drop title="Alterar" size="sm">
                              <Drop.Item
                                onClick={() => {
                                  setShowAutoComplete('status');
                                }}
                                icon={<Icon icon="exchange" />}
                              >
                                Status
                              </Drop.Item>
                              <Drop.Item
                                onClick={() => {
                                  setShowAutoComplete('operator');
                                }}
                                icon={<Icon icon="user" />}
                              >
                                Operador
                              </Drop.Item>
                              <Drop.Item
                                onClick={() => {
                                  setShowAutoComplete('modality');
                                }}
                                icon={<Icon icon="detail" />}
                              >
                                Esteira
                              </Drop.Item>
                            </Drop>
                          </DropdownContainer>

                          <ChangeStatusOrOperatorContainer>
                            {showAutoComplete === 'status' && status && (
                              <CustomAutocomplete
                                variant="outlined"
                                label="Alterar status"
                                placeholder="Status"
                                options={status.map((option) => option.status)}
                                autoValue={statusValue}
                                handleConfirm={handleConfirmStatus}
                              />
                            )}

                            {showAutoComplete === 'operator' && usersList && (
                              <CustomAutocomplete
                                variant="outlined"
                                label="Alterar operador"
                                placeholder="Operador"
                                options={usersList.map((option) => option.name)}
                                autoValue={operatorValue}
                                handleConfirm={handleConfirmOperator}
                              />
                            )}

                            {showAutoComplete === 'modality' && modalities && (
                              <CustomAutocomplete
                                variant="outlined"
                                label="Alterar esteira"
                                placeholder="Esteira"
                                options={modalities.map(
                                  (option) => option.name,
                                )}
                                autoValue={modalityValue}
                                handleConfirm={handleConfirmModality}
                              />
                            )}
                          </ChangeStatusOrOperatorContainer>
                        </SubHeaderWrapper>
                      </>
                    </div>
                    <Row>
                      <TimelineBtn>
                        <StyledLink
                          to={`/reports/detail/${idDocument}/logs`}
                          testID="btnTimeline"
                        >
                          <PrimaryButton>Timeline</PrimaryButton>
                        </StyledLink>
                      </TimelineBtn>
                    </Row>
                  </>
                ) : (
                  <DetailsLoading />
                )}
              </SubHeaderItems>
            )}
          />

          {boxesData.length > 0 ? (
            boxesData.map((box) => Object.entries(box).map(([key, value]) => {
              if (value) {
                return (
                  <BoxCard
                    key={key}
                    title={key}
                    content={value}
                    id={document?.id}
                  />
                );
              }
            }))
          ) : (
            <DetailsLoadingContainer>
              <DetailsLoading />
            </DetailsLoadingContainer>
          )}

          <TabsContainer>
            <TabContext value={TabOnevalue}>
              <TabListContainer>
                <TabList
                  style={{ marginLeft: '25px' }}
                  onChange={handleChangeTabOne}
                  aria-label="dashboard tabs"
                  indicatorColor="primary"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: colors.details,
                      marginBottom: '10px',
                    },
                  }}
                >
                  <TabLabel
                    position="left"
                    label="Retorno ao solicitante"
                    value="1"
                    testID="btnRetornoCliente"
                  />

                  <TabLabel
                    position="right"
                    label="Observações internas"
                    value="2"
                    testID="btnObservacoesInternas"
                  />
                </TabList>
              </TabListContainer>

              <TabsWrapper>
                <TabPanel value="1">
                  <CardMessagesContainer>
                    <CardContent>
                      <List dense aria-label="return to the client">
                        {document && sortedObservations.length !== 0 ? (
                          sortedObservations.map((obs) => {
                            let listItem;
                            if (
                              obs.observation_from === 'client'
                              || obs.observation_from === 'question'
                            ) {
                              listItem = (
                                <MessagesContainer>
                                  <MessagesWrapper from={obs.observation_from}>
                                    <MessageItems>
                                      <Typography
                                        color="black"
                                        fontSize="14px"
                                        vertical="5px"
                                      >
                                        {obs.message}
                                      </Typography>

                                      <DateAndDoubleTickContainer>
                                        <MessageDate>
                                          <Typography color="grey">
                                            {`${obs.createdAt} - ${
                                              obs.user?.name || 'Indisponível'
                                            }`}
                                          </Typography>

                                          {obs.attachment_name && (
                                            <Typography
                                              color="grey"
                                              horizontal="10px"
                                              vertical="-2px"
                                            >
                                              <Tooltip
                                                title={obs.attachment_name}
                                              >
                                                {getClientFileIcon(
                                                  obs.attachment_name,
                                                )}
                                              </Tooltip>
                                            </Typography>
                                          )}

                                          <Typography
                                            color="grey"
                                            vertical="-2px"
                                          >
                                            {obs.send_communication
                                            === false ? (
                                              <DoubleTickIcon
                                                src="https://campanhasmail.azurewebsites.net/images/workflow/blue-double-tick.png"
                                                alt="Double tick"
                                              />
                                              ) : (
                                                <DoubleTickIcon
                                                  src="https://campanhasmail.azurewebsites.net/images/workflow/grey-double-tick.png"
                                                  alt="Double tick"
                                                />
                                              )}
                                          </Typography>
                                        </MessageDate>
                                      </DateAndDoubleTickContainer>
                                    </MessageItems>
                                  </MessagesWrapper>
                                </MessagesContainer>
                              );
                            }
                            return listItem;
                          })
                        ) : (
                          <EmptyMessages>
                            <LottieNotification
                              animation="message"
                              color="#A8A8A8"
                              description=""
                            />
                          </EmptyMessages>
                        )}
                      </List>
                    </CardContent>
                  </CardMessagesContainer>

                  <InputMessageContainer>
                    <CardContent>
                      <Form
                        id="formdata"
                        ref={formRef}
                        onSubmit={handleToggleModalConfirmMessage}
                      >
                        <InputFieldContainer>
                          <Box>
                            <TextFieldContainer>
                              <TextField
                                id="customerReturn"
                                testID="txtRetornoCliente"
                                rows={4}
                                size="small"
                                name="customerReturn"
                                label=""
                                variant="outlined"
                                fullWidth
                                multiline
                                placeholder="Digite aqui o retorno ao solicitante..."
                                InputProps={{
                                  classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                  },
                                  inputMode: 'numeric',
                                }}
                              />
                            </TextFieldContainer>
                          </Box>

                          <InputButtonsContainer>
                            <Tooltip
                              title={
                                selectedFile && selectedFile.name
                                  ? selectedFile.name
                                  : 'Adicionar anexo'
                              }
                            >
                              <AttachmentButton
                                type="button"
                                onClick={handleToggleModalDropzone}
                                testID="btnAnexo"
                              >
                                {selectedFile ? (
                                  getSelectedFileIcon()
                                ) : (
                                  <AttachFileIcon />
                                )}
                              </AttachmentButton>
                            </Tooltip>

                            <PrimaryButton
                              style={{ height: '40px', margin: '0 25px' }}
                              testID="btnEnviar"
                              onClick={handleMessageTitle(
                                'Adicionar retorno ao solicitante',
                                'As informações serão enviadas na próxima alteração de status com comunicação!',
                              )}
                            >
                              <SendIcon fontSize="small" />
                            </PrimaryButton>
                          </InputButtonsContainer>
                        </InputFieldContainer>
                      </Form>
                    </CardContent>
                  </InputMessageContainer>
                </TabPanel>

                <TabPanel value="2">
                  <CardMessagesContainer raised>
                    <CardContent>
                      <List dense aria-label="internal observations">
                        {document && sortedObservations.length !== 0 ? (
                          sortedObservations.map((obs) => {
                            let listItem;
                            if (obs.observation_from === 'internal') {
                              listItem = (
                                <MessagesContainer>
                                  <MessagesWrapper>
                                    <MessageItems>
                                      <Typography
                                        color="black"
                                        fontSize="14px"
                                        vertical="5px"
                                      >
                                        {obs.message}
                                      </Typography>
                                      <ObservationsDate>
                                        <Typography color="grey">
                                          {`${obs.createdAt} - ${
                                            obs.user?.name || 'Indisponível'
                                          }`}
                                        </Typography>
                                      </ObservationsDate>
                                    </MessageItems>
                                  </MessagesWrapper>

                                  <DeleteBtn
                                    type="button"
                                    onClick={() => {
                                      handleDeleteObservation(obs);
                                    }}
                                  >
                                    <TrashAlt width="30px" color="red" />
                                  </DeleteBtn>
                                </MessagesContainer>
                              );
                            }
                            return listItem;
                          })
                        ) : (
                          <EmptyMessages>
                            <EmptyMessages>
                              <LottieNotification
                                animation="message"
                                color="#A8A8A8"
                                description=""
                              />
                            </EmptyMessages>
                          </EmptyMessages>
                        )}
                      </List>
                    </CardContent>
                  </CardMessagesContainer>

                  <InputMessageContainer>
                    <CardContent>
                      <Form
                        id="formDataInternalObservation"
                        ref={formRefInternalObservation}
                        onSubmit={handleToggleModalConfirmMessage}
                      >
                        <InputFieldContainer>
                          <TextFieldContainer>
                            <TextField
                              id="internalObservation"
                              rows={4}
                              size="small"
                              name="internalObservation"
                              label=""
                              multiline
                              variant="outlined"
                              fullWidth
                              placeholder="Digite aqui as observações internas do processo..."
                              InputProps={{
                                classes: {
                                  root: classes.cssOutlinedInput,
                                  focused: classes.cssFocused,
                                  notchedOutline: classes.notchedOutline,
                                },
                                inputMode: 'numeric',
                              }}
                            />
                          </TextFieldContainer>

                          <InputButtonsContainer>
                            <PrimaryButton
                              style={{ height: '40px', margin: '0 25px' }}
                              onClick={handleMessageTitle(
                                'Adicionar observação interna',
                                'Confirme ou cancele sua mensagem!',
                              )}
                            >
                              <SendIcon fontSize="small" />
                            </PrimaryButton>
                          </InputButtonsContainer>
                        </InputFieldContainer>
                      </Form>
                    </CardContent>
                  </InputMessageContainer>
                </TabPanel>
              </TabsWrapper>
            </TabContext>
          </TabsContainer>
        </MainContainer>

        <DocumentCardsColumn>
          <ColumnTitle>
            <DocumentTitle>
              <Typography fontSize="26px" bold vertical="40px">
                Documentos
              </Typography>
            </DocumentTitle>

            <DocumentBtns>
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  testID="btnDocumentos"
                >
                  <Bars width="30px" color="#000" />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.menu}
                  MenuListProps={{ onMouseLeave: handleClose }}
                >
                  <MenuItem
                    onClick={handleAddDocument}
                    testID="btnAdicionarDocumento"
                  >
                    Adicionar documento
                  </MenuItem>
                  <MenuItem
                    onClick={handleAddPendency}
                    testID="btnAdicionarpendencia"
                  >
                    Adicionar pendência
                  </MenuItem>
                  <MenuItem
                    onClick={handleDownloadAllFilesButton}
                    testID="btnBaixarDocumentos"
                  >
                    Baixar todos os documentos
                  </MenuItem>
                </Menu>
              </div>
            </DocumentBtns>
          </ColumnTitle>

          <DocumentCardsContainer>
            {document
              && sortedAttachments.length > 0
              && sortedAttachments.map((attachment) => (
                <DocumentCard
                  handleDocumentCard={handleDocumentCard}
                  attachment={attachment}
                />
              ))}

            {!document && <CardsLoading />}
            {document && sortedAttachments?.length === 0 && (
              <Typography>
                Não há documentos cadastrados até o momento.
              </Typography>
            )}
          </DocumentCardsContainer>
        </DocumentCardsColumn>
      </DetailsContainer>
    </>
  );
};

export default ReportDetail;
