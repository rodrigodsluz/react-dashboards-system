import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { useSelector, shallowEqual } from 'react-redux';

import Box from '@material-ui/core/Box';
import { Typography } from '@d1.cx/components';

import Timeline from '@material-ui/lab/Timeline';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import TableLoading from '../../../components/Skeleton/TableLoading/TableLoading';
import SnackAlert from '../../../components/SnackAlert';

import CustomSubHeader from '../../../components/CustomSubHeader';
import { dispatch } from '../../../Config/store';

import {
  TimelineContainer,
  TimelineWrapper,
  ContentContainer,
  UserAndDateInfo,
} from './styles';

/**
 * @function CustomTimeline
 * @description Página com a timeline dos relatórios
 */
const CustomTimeline = () => {
  const { idDocument } = useParams();

  const documentLogs = useSelector(
    (state) => state.Document.documentLogs,
    shallowEqual,
  );

  const document = useSelector(
    (state) => state.Document.uniqueDocument,
    shallowEqual,
  );

  const [errorAPI, setErrorAPI] = useState(false);
  const handleLoadDocuments = useCallback(async () => {
    try {
      if (idDocument) {
        const data = { document_id: parseInt(idDocument, 10), log_action_blacklist: ['STEP_UPDATED'] };
        await dispatch.Document.loadDocumentLogsAsync(data);
        await dispatch.Document.loadDocumentByIdAsync(idDocument);
      }
    } catch (error) {
      setErrorAPI(error);
    }
  }, [idDocument, errorAPI]);

  const handleCloseNotification = useCallback(() => {
    setErrorAPI(false);
  }, [errorAPI]);

  useEffect(() => {
    handleLoadDocuments();
  }, [idDocument]);

  return (
    <TimelineContainer>
      <SnackAlert
        open={errorAPI}
        severity="error"
        message="Ops! Não foi possivel encontrar os dados. Verifique sua conexão e tente novamente."
        handleClose={handleCloseNotification}
      />
      <Box style={{ width: '100%' }}>
        <CustomSubHeader
          showBackButton
          backRoute={`/reports/detail/${idDocument}`}
          pageTitle="Timeline"
        />

        <TimelineWrapper>
          {documentLogs.length > 0 ? (
            <Timeline align="alternate" style={{ overflowY: 'auto' }}>
              {documentLogs.map((log) => (
                <TimelineItem key={log.id}>
                  <TimelineSeparator>
                    <TimelineDot
                      style={{
                        backgroundColor: document
                          ? document?.status.styles.backgroundColor
                          : '#6495ED',
                      }}
                    >
                      <PriorityHighIcon fontSize="large" />
                    </TimelineDot>

                    <TimelineConnector />
                  </TimelineSeparator>

                  <TimelineContent>
                    <ContentContainer>
                      <Typography bold fontSize="16px">
                        {log.title}
                      </Typography>
                      {log.messages.map((message) => (
                        <Typography
                          fontSize="14px"
                          vertical="8px"
                          bold
                          color="grey"
                          key={uuidv4()}
                        >
                          {message}
                        </Typography>
                      ))}

                      <Typography fontSize="14px" align="right" color="#9D9CA1">
                        <UserAndDateInfo>
                          {log.user}
                          <div>
                            {log.date}
                            {' '}
                            -
                            {' '}
                            {log.time}
                          </div>
                        </UserAndDateInfo>
                      </Typography>
                    </ContentContainer>
                  </TimelineContent>
                </TimelineItem>
              ))}

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      backgroundColor: document
                        ? document.status.styles.backgroundColor
                        : '#6495ED',
                    }}
                  >
                    <PriorityHighIcon fontSize="large" />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent />
              </TimelineItem>
            </Timeline>
          ) : (
            <TableLoading />
          )}
        </TimelineWrapper>
      </Box>
    </TimelineContainer>
  );
};

export default CustomTimeline;
