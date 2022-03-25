/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

import { Modal } from 'rsuite';
import { PrimaryButton } from '@d1.cx/components';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import checkStatus from '../../utils/checkStatus';
import { dispatch } from '../../Config/store';
import { useModal } from '../../hooks/useModal';
import StatusModal from '../Modal';
import BoxCard from '../../Pages/Report/ReportDetail/components/BoxCard/BoxCard';
import DetailsLoading from '../Skeleton/Skeleton';
import useWindowSize from '../../utils/windowDimension';
import {
  useStyles,
  ChangeStatusBtn,
  FooterContainer,
  DetailsLoadingContainer,
  DocumentsContainer,
  DetailsContainer,
  DetailsWrapper,
  PdfContainer,
  OutlineButton,
  MotionSquare,
  ProtocolWrapper,
} from './styles';
import PDFViewer from '../PDFViewer';

function isPdf(filename) {
  return /\.(pdf)$/i.test(filename);
}

function isImage(filename) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filename);
}

const AttachmentModal = ({
  path,
  title,
  show,
  handleConfirm,
  attachment,
  boxesData,
  protocol,
  toggleAttachModal,
}) => {
  const classes = useStyles();

  const [isPdfFile, setIsPdfFile] = useState(false);
  const [isImageFile, setIsImageFile] = useState(false);
  const [otherTypeFile, setOtherTypeFile] = useState(false);

  const { isShownModal, toggleModal } = useModal();
  const { idDocument } = useParams();

  const [newStatus, setNewStatus] = useState();
  const [attachmentId, setAttachmentId] = useState();
  const [informations, setInformations] = useState(false);

  useEffect(() => {
    setIsPdfFile(false);
    setIsImageFile(false);
    setOtherTypeFile(false);

    if (path) {
      const res = path.split('?');
      if (isPdf(res[0])) {
        setIsPdfFile(true);
      } else if (isImage(res[0])) {
        setIsImageFile(true);
      } else {
        setOtherTypeFile(true);
      }
    }
  }, [path]);

  function imageBody() {
    return (
      <Box className={classes.imgBox}>
        <img className={classes.img} src={path} alt="Attachment" />
      </Box>
    );
  }

  function pdfBody() {
    return (
      <PdfContainer>
        <PDFViewer path={path} style={{ width: '100%', height: '100vh' }} />
      </PdfContainer>
    );
  }

  function otherFiles() {
    return (
      <Box className={classes.otherFilesBox}>
        <Typography className={classes.messageOtherFiles}>
          Este arquivo está disponível apenas para download!
        </Typography>
      </Box>
    );
  }

  /**
   * @function getModalSize
   * @description Retorna o breakpoint do tamanho do modal baseado no tamanho
   * atual da tela
   */
  const getModalSize = () => {
    const windowSize = useWindowSize();
    let size = 'lg';

    if (windowSize.width <= 1024) {
      size = 'md';
    }

    if (windowSize.width <= 825) {
      size = 'sm';
    }

    if (windowSize.width <= 625) {
      size = 'xs';
    }

    return size;
  };

  /** selecting radio option */
  const handleChange = useCallback((event) => {
    setNewStatus(event.target.value);
  }, []);

  const handleOpenInformations = () => {
    setInformations(!informations);
  };

  const handleCloseAttachment = () => {
    toggleAttachModal();
    setInformations(false);
  };

  const handleConfirmStatusChange = useCallback(async () => {
    const data = {
      id: attachmentId,
      status: newStatus,
    };
    await dispatch.Attachment.changeStatusAsync(data);
    await dispatch.Document.loadDocumentByIdAsync(idDocument);
  }, [newStatus, attachmentId]);

  return (
    <>
      <MotionSquare
        drag
        dragConstraints={{
          top: -400,
          left: -600,
          right: 590,
          bottom: 530,
        }}
      >
        <DetailsContainer info={informations} show={show}>
          <DetailsWrapper>
            {boxesData.length > 0 ? (
              boxesData.map((box) => Object.entries(box).map(([key, value]) => (
                <BoxCard key={key} title={key} content={value} />
              )))
            ) : (
              <DetailsLoadingContainer>
                <DetailsLoading />
              </DetailsLoadingContainer>
            )}
          </DetailsWrapper>
        </DetailsContainer>
      </MotionSquare>
      <Modal
        size={getModalSize()}
        show={show}
        onHide={handleCloseAttachment}
        style={{
          zIndex: '123',
          width: '100%',
        }}
      >
        {/** Modal to change status */}
        <StatusModal
          open={isShownModal}
          handleClose={toggleModal}
          title="Selecione o novo status"
          confirm={handleConfirmStatusChange}
          content={(
            <Box className={classes.modalBox}>
              <RadioGroup
                aria-label="gender"
                name="status"
                onChange={handleChange}
              >
                <Box className={classes.optionBox}>
                  <Radio
                    color="primary"
                    value="ok"
                    name="ok"
                    inputProps={{ 'aria-label': 'A' }}
                    id="ok"
                  />
                  <Typography>Ok</Typography>
                </Box>
                <Box className={classes.optionBox}>
                  <Radio
                    color="primary"
                    value="pending"
                    name="pending"
                    inputProps={{ 'aria-label': 'B' }}
                    id="pending"
                  />
                  <Typography>Pendente</Typography>
                </Box>
              </RadioGroup>
            </Box>
          )}
        />
        {/** end modal to change status */}
        <Modal.Header>
          <Modal.Title>
            <div className={classes.title}>
              <div>{title}</div>
              <OutlineButton onClick={handleOpenInformations} info>
                {!informations ? 'Ver informações' : 'Fechar informações'}
              </OutlineButton>
              <ProtocolWrapper>{protocol}</ProtocolWrapper>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <DocumentsContainer>
            {isPdfFile && pdfBody()}
            {isImageFile && imageBody()}
            {otherTypeFile && otherFiles()}
          </DocumentsContainer>
        </Modal.Body>

        <Modal.Footer>
          <FooterContainer>
            <OutlineButton onClick={handleCloseAttachment}>
              Cancelar
            </OutlineButton>

            <Tooltip title="Clique para alterar o status">
              <ChangeStatusBtn
                type="button"
                onClick={() => {
                  setAttachmentId(attachment.id);
                  toggleModal();
                }}
              >
                {checkStatus(attachment.status)}
              </ChangeStatusBtn>
            </Tooltip>

            <PrimaryButton onClick={handleConfirm}>
              <a
                href={`${path}`}
                rel="noopener noreferrer"
                download
                className={classes.link}
              >
                Download
              </a>
            </PrimaryButton>
          </FooterContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AttachmentModal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  attachment: PropTypes.object.isRequired,
};

export default AttachmentModal;
