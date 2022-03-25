import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, PrimaryButton, Spacing } from '@d1.cx/components';
import {
  Container,
  Row,
  WrapperLottie,
  Wrapper,
  TableLoadingContainer,
} from './styles';
import TableJourney from './components/Table/TableJourney';
import TableLoading from '../../components/Skeleton/TableLoading/TableLoading';
import { dispatch } from '../../Config/store';
import RightModal from '../../components/RightModal/RightModal';
import NewJourneyModal from './components/NewJourneyModal/NewJourneyModal';
import LottieNotification from '../../components/LottieNotification/LottieNotification';
import SnackAlert from '../../components/SnackAlert';

const Journey = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const modalities = useSelector((state) => state.Modalities.modalities);

  const journeys = useSelector((state) => state.Journeys.journeys);
  const [journeyName, setJourneyName] = useState('');
  const [availableModalities, setAvaliableModalities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [resetSearchFilter, setResetSearchFilter] = useState(false);
  /**
   * @function handleChangeJourneynameFilter
   * @description Seta o nome de usuario a ser filtrado
   */

  const handleChangeJourneynameFilter = useCallback(
    ({ target }) => {
      setJourneyName(target.value);
    },
    [journeyName],
  );

  const resetFilterBackSpace = (event) => {
    const valid = event?.key === 'Backspace';
    setResetSearchFilter(valid);
  };

  /**
   * @function handleGetAllJourneyAndModalities
   * @description Bate na api, retorna todos as jornadas criadas
   */

  const handleGetAllJourneyAndModalities = useCallback(async () => {
    try {
      setErrorAPI(false);
      await dispatch.Journeys.loadJourneysByProductAsync(currentProductById);
      await dispatch.Modalities.loadModalitiesByproductAsync(
        currentProductById,
      );
    } catch (error) {
      setErrorAPI(true);
      setAvaliableModalities([]);
    }
  }, [currentProductById]);

  /**
   * @function getUnusedModalities
   * @description Filtra as esteiras que ainda não foram utilizadas
   */
  const getUnusedModalities = useCallback(() => {
    if (journeys && modalities) {
      const usedModalities = journeys?.map((journey) => journey.modality_id);
      const notUsed = modalities?.filter(
        (modality) => !usedModalities.includes(modality.id),
      );
      setAvaliableModalities(notUsed);
    }
  }, [journeys, modalities]);

  const handleLoading = useCallback(() => {
    if (!journeys) {
      setloadingTable(true);
    } else {
      setloadingTable(false);
    }
  }, [journeys]);

  const handleCloseNotification = useCallback(() => {
    setErrorAPI(false);
  }, [errorAPI]);

  useEffect(() => {
    handleGetAllJourneyAndModalities();
  }, [currentProductById]);

  useEffect(() => {
    getUnusedModalities();
  }, [journeys, modalities]);

  useEffect(() => {
    handleLoading();
  }, [journeys]);

  useEffect(() => {
    window.addEventListener('keydown', resetFilterBackSpace);
    return () => {
      window.removeEventListener('keydown', resetFilterBackSpace);
    };
  }, []);

  return (
    <Container>
      <SnackAlert
        open={errorAPI}
        handleClose={handleCloseNotification}
        severity="error"
        message="Ops! Não foi possivel encontrar os dados. Verifique sua conexão e tente novamente."
      />
      <Wrapper>
        {availableModalities.length > 0 && (
          <Row>
            <PrimaryButton
              onClick={() => setOpenModal(true)}
              data-testid="btnAdicionarJornada"
            >
              Nova jornada
            </PrimaryButton>
          </Row>
        )}

        <Spacing vertical="10px" />

        {journeys.length > 0 && (
          <>
            <Input
              width="100%"
              placeholder="Buscar por nome da jornada"
              onChange={handleChangeJourneynameFilter}
              value={journeyName}
              data-testid="txtFiltroJornadas"
              onKeyPress={resetFilterBackSpace}
            />
            <TableJourney
              data={journeys}
              filtered={journeyName}
              currentProductById={currentProductById}
              resetSearchFilter={resetSearchFilter}
            />
          </>
        )}

        {journeys.length === 0 && (
          <WrapperLottie>
            <LottieNotification
              hiddenBg
              animation="lupa"
              description="Não há jornadas adicionadas!"
            />
          </WrapperLottie>
        )}

        {!journeys && loadingTable && (
          <TableLoadingContainer>
            <TableLoading />
          </TableLoadingContainer>
        )}
      </Wrapper>
      <RightModal open={openModal}>
        <NewJourneyModal
          onClose={() => setOpenModal(false)}
          modalities={availableModalities}
          currentProductById={currentProductById}
        />
      </RightModal>
    </Container>
  );
};

export default Journey;
