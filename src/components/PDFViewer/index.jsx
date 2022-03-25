/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/prefer-default-export */
import React, {
  useEffect, useRef, useState, useMemo,
} from 'react';

/** @typedef {import('pdfjs-dist/types/display/api').PDFDocumentProxy} PDF */

import clsx from 'clsx';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

import TableLoading from '../Skeleton/TableLoading/TableLoading';

import { useStyles } from './styles';

const PDFViewer = ({ path }) => {
  const canvasEl = useRef();
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const scales = [0.5, 0.75, 1, 1.5, 2, 2.5, 3];
  const initialScale = 1.5;

  /** @type {[PDF, React.Dispatch<PDF>]} */
  const [pdf, setPdf] = useState();
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(initialScale);
  const [loading, setLoading] = useState(true);

  const renderTask = useRef();

  const [showModal, setShowModal] = useState(false);
  const [selectingPage, setSelectingPage] = useState(page);

  useEffect(() => {
    (async () => {
      const newPdf = await pdfjs.getDocument(path).promise;
      setPdf(newPdf);
    })();
  }, [path]);

  useEffect(() => {
    if (canvasEl.current && pdf) {
      (async () => {
        try {
          if (renderTask.current) {
            renderTask.current.cancel();
            setLoading(false);
          }

          setLoading(true);
          setNumPages(pdf.numPages);

          const curPage = await pdf.getPage(page);
          const viewport = curPage.getViewport({ scale });

          const canvas = canvasEl.current;
          const context = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          renderTask.current = curPage.render({ canvasContext: context, viewport });
          await renderTask.current.promise;
          setLoading(false);
          renderTask.current = null;
        } catch (e) {
          // Render cancelled
        }
      })();
    }
  }, [canvasEl, pdf, page, scale]);

  const canGoBack = useMemo(() => page > 1, [page]);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const canGoNext = useMemo(() => page < numPages, [page, numPages]);
  const handleNextPage = () => {
    if (page < numPages) {
      setPage(page + 1);
    }
  };

  const toggleModal = () => {
    if (!showModal) {
      setSelectingPage(page);
    }
    setShowModal(!showModal);
  };

  const handlePageChange = ({ target: { value } }) => {
    if (/^\d*$/g.test(value)) {
      setSelectingPage(value);
    }
  };

  const handleSetPage = () => {
    setPage(+selectingPage);
    setShowModal(!showModal);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSetPage();
    }
  };

  const selectingPageValid = useMemo(
    () => !Number.isNaN(selectingPage)
      && +selectingPage >= 1
      && +selectingPage <= numPages, [selectingPage, numPages],
  );

  //  ZOOM  //
  const canZoomIn = useMemo(() => scales.indexOf(scale) < scales.length - 1, [scale, scales]);
  const handleZoomIn = () => {
    const index = scales.indexOf(scale);
    if (index < scales.length - 1) {
      setScale(scales[index + 1]);
    }
  };

  const canZoomOut = useMemo(() => scales.indexOf(scale) > 0, [scale, scales]);
  const handleZoomOut = () => {
    const index = scales.indexOf(scale);
    if (index > 0) {
      setScale(scales[index - 1]);
    }
  };

  const handleResetZoom = () => {
    setScale(initialScale);
  };

  const classes = useStyles();

  return (
    <>
      <Dialog open={showModal} onClose={toggleModal}>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Número da página"
            fullWidth
            autoFocus
            onChange={handlePageChange}
            value={selectingPage}
            onKeyPress={handleEnter}
            onFocus={(e) => e.currentTarget.select()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button onClick={handleSetPage} disabled={!selectingPageValid} color="primary">Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Box className={classes.container}>
        <Box className={classes.scrollable}>
          <canvas ref={canvasEl} />
        </Box>
        <Box className={classes.actions}>
          <Box className={clsx(classes.fadeHover, classes.pagination)}>
            <ButtonGroup color="primary" variant="contained">
              <Button onClick={handlePreviousPage} disabled={!canGoBack}>
                <LeftIcon />
              </Button>
              <Button onClick={toggleModal}>{`Página ${page} de ${numPages}`}</Button>
              <Button onClick={handleNextPage} disabled={!canGoNext}>
                <RightIcon />
              </Button>
            </ButtonGroup>
          </Box>

          <Box className={clsx(classes.fadeHover, classes.zoom)}>
            <ButtonGroup
              color="primary"
              variant="contained"
              size="small"
              orientation="vertical"
            >
              <Button onClick={handleZoomIn} disabled={!canZoomIn}><ZoomInIcon /></Button>
              <Button onClick={handleResetZoom}><ZoomOutMapIcon /></Button>
              <Button onClick={handleZoomOut} disabled={!canZoomOut}><ZoomOutIcon /></Button>
            </ButtonGroup>
          </Box>
        </Box>
        <Box className={clsx(classes.loading, { active: !loading })}>
          <TableLoading />
        </Box>
      </Box>
    </>
  );
};

PDFViewer.propTypes = {
  path: PropTypes.string.isRequired,

};

export default PDFViewer;
