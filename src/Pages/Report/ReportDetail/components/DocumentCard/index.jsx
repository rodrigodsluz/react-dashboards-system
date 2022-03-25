/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useCallback } from 'react';
import { Typography } from '@d1.cx/components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { EllipsisV, TrashAlt } from '@d1.cx/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useParams } from 'react-router-dom';

import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import colors from '../../../../../theme/colors';
// import checkStatus from '../../../../../utils/checkStatus';
import { dispatch } from '../../../../../Config/store';
import Modal from '../../../../../components/Modal';
import ExcludeContent from '../../../../../components/ExcludeContent';
import {
  useStyles,
  CardBtn,
  Wrapper,
  CardInfo,
  DeleteBtn,
  ThreeDotsMenu,
  Container,
  CardIcon,
  CardName,
  RadioWrapper,
} from './styles';

function DocumentCard({ attachment, handleDocumentCard }) {
  const { idDocument } = useParams();
  const classes = useStyles();

  const [
    showModalToConfirmDeleteAttachment,
    setShowModalToConfirmDeleteAttachment,
  ] = useState(false);

  const [attachmentToDelete, setAttachmentToDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleModalToConfirmDeleteAttachment = useCallback(() => {
    setShowModalToConfirmDeleteAttachment(!showModalToConfirmDeleteAttachment);
  }, [showModalToConfirmDeleteAttachment]);

  const deleteAttachment = useCallback(async () => {
    const data = { id: attachmentToDelete.id };
    await dispatch.Attachment.deleteAttachmentAsync(data);
    await dispatch.Document.loadDocumentByIdAsync(idDocument);
  }, [attachmentToDelete]);

  const handleConfirmStatusChange = async (event) => {
    try {
      setLoading(true);
      const data = {
        id: attachment.id,
        status: event.target.value,
      };
      await dispatch.Attachment.changeStatusAsync(data);
      await dispatch.Document.loadDocumentByIdAsync(idDocument);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  function isPdf(filename) {
    return /\.(pdf)$/i.test(filename);
  }

  function isImage(filename) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filename);
  }

  const [isPdfFile, setIsPdfFile] = useState(false);
  const [isImageFile, setIsImageFile] = useState(false);
  const [otherTypeFile, setOtherTypeFile] = useState(false);

  useEffect(() => {
    setIsPdfFile(false);
    setIsImageFile(false);
    setOtherTypeFile(false);

    if (attachment.path) {
      const res = attachment?.path?.split('?');
      if (isPdf(res[0])) {
        setIsPdfFile(true);
      } else if (isImage(res[0])) {
        setIsImageFile(true);
      } else {
        setOtherTypeFile(true);
      }
    }
  }, [attachment.path]);

  return (
    <>
      {/** Modal to confirm delete attachment */}
      <Modal
        open={showModalToConfirmDeleteAttachment}
        handleClose={handleToggleModalToConfirmDeleteAttachment}
        title="Selecione o novo status"
        confirm={deleteAttachment}
        content={(
          <ExcludeContent
            messageOne="Deseja deletar o documento:"
            messageTwo={attachmentToDelete?.name}
          />
        )}
      />
      {/** end modal to confirm delete attachment  */}

      <Container>
        <CardBtn
          type="button"
          onClick={() => {
            handleDocumentCard(attachment);
          }}
        >
          <CardIcon status={attachment.status}>
            {isPdfFile && (
              <img
                src="https://campanhasmail.azurewebsites.net/images/workflow/pdf-icon.png"
                alt="PDF Icon"
              />
            )}

            {isImageFile && <ImageIcon fontSize="large" />}

            {otherTypeFile && <DescriptionIcon fontSize="large" />}

            {!otherTypeFile && !isImageFile && !isPdfFile && (
              <PriorityHighIcon fontSize="large" />
            )}
          </CardIcon>

          <CardInfo>
            <CardName>
              <Typography color={colors.textSecondary} fontSize="14px" bold>
                {attachment?.name?.length > 65
                  ? `${attachment.name.substring(0, 50 - 3)}...`
                  : attachment.name}
              </Typography>
            </CardName>
            <Wrapper>
              <Typography color="grey" fontSize="14px">
                {attachment.user
                  ? attachment.user.name.length > 35
                    ? `${attachment.user.name.substring(0, 35 - 3)}...`
                    : attachment.user.name
                  : 'Indisponível'}
              </Typography>
            </Wrapper>

            <Wrapper>
              <Typography color="grey" fontSize="14px">
                {attachment.date}
              </Typography>
            </Wrapper>
          </CardInfo>
        </CardBtn>
        {!loading ? (
          <ThreeDotsMenu>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onMouseOver={handleClick}
            >
              <EllipsisV width="30px" color="#000" />
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              className={classes.menu}
            >
              <MenuItem onClick={handleClose} style={{ background: 'white' }}>
                <div>
                  {' '}
                  <Box className={classes.modalBox}>
                    <RadioGroup
                      aria-label="gender"
                      name="status"
                      onChange={handleConfirmStatusChange}
                    >
                      <RadioWrapper>
                        <Box className={classes.optionBox}>
                          <Radio
                            color="primary"
                            value="ok"
                            name="ok"
                            inputProps={{ 'aria-label': 'A' }}
                            checked={attachment.status === 'ok'}
                            testID="radioOK"
                          />
                          <Typography>Ok</Typography>
                        </Box>
                        <Box className={classes.optionBox}>
                          <Radio
                            color="primary"
                            value="pending"
                            name="pending"
                            inputProps={{ 'aria-label': 'B' }}
                            checked={attachment.status === 'pending'}
                            testID="radioPendente"
                          />
                          <Typography>Pendente</Typography>
                        </Box>
                      </RadioWrapper>
                    </RadioGroup>
                  </Box>
                </div>
                <Tooltip title="Clique para deletar">
                  <DeleteBtn
                    onClick={() => {
                      setAttachmentToDelete(attachment);
                      handleToggleModalToConfirmDeleteAttachment();
                    }}
                  >
                    <TrashAlt width="30px" color="red" />
                  </DeleteBtn>
                </Tooltip>
              </MenuItem>
            </Menu>
          </ThreeDotsMenu>
        ) : null}
      </Container>
    </>
  );
}

DocumentCard.propTypes = {
  attachment: PropTypes.object.isRequired,
};

export default DocumentCard;
