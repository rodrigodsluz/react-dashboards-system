import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@d1.cx/components';
import { Container, WrapperLottie } from './styles';
import TableJourney from './components/Table/TableJourney';
import TableLoading from '../../../../../components/Skeleton/TableLoading/TableLoading';
import { dispatch } from '../../../../../Config/store';
import RightModal from '../../../../../components/RightModal/RightModal';
import NewJourneyModal from './components/NewJourneyModal/NewJourneyModal';
import LottieNotification from '../../../../../components/LottieNotification/LottieNotification';

const AllTransitions = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const modalities = useSelector((state) => state.Modalities.modalities);

  const journeys = useSelector((state) => state.Journeys.journeys);
  const [journeyName, setJourneyName] = useState('');
  const [availableModalities, setAvaliableModalities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
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

  /**
   * @function handleGetAllJourneyAndModalities
   * @description Bate na api, retorna todos as jornadas criadas
   */

  const handleGetAllJourneyAndModalities = useCallback(async () => {
    try {
      await dispatch.Journeys.loadJourneysByProductAsync(currentProductById);
      await dispatch.Modalities.loadModalitiesByproductAsync(
        currentProductById,
      );
    } catch (error) {
      console.error('Error', error);
    }
  }, [currentProductById]);

  /**
   * @function getUnusedModalities
   * @description Filtra quais as esteiras que ainda não foram utilizadas
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

  useEffect(() => {
    handleGetAllJourneyAndModalities();
  }, [currentProductById]);

  useEffect(() => {
    getUnusedModalities();
  }, [journeys, modalities]);

  useEffect(() => {
    handleLoading();
  }, [journeys]);

  return (
    <>
      <Container>

        {journeys.length > 0 && (
          <>
            <Input
              width="100%"
              placeholder="Buscar por nome do status ou do template"
              onChange={handleChangeJourneynameFilter}
              value={journeyName}
            />
            <TableJourney
              data={journeys}
              filtered={journeyName}
              currentProductById={currentProductById}
            />
          </>
        )}

        {journeys.length === 0 && (
          <WrapperLottie>
            <LottieNotification hiddenBg />
          </WrapperLottie>
        )}

        {!journeys && loadingTable && <TableLoading />}
      </Container>
      <RightModal open={openModal}>
        <NewJourneyModal
          onClose={() => setOpenModal(false)}
          modalities={availableModalities}
          currentProductById={currentProductById}
        />
      </RightModal>
    </>
  );
};

export default AllTransitions;
