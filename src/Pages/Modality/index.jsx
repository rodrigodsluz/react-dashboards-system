/* eslint-disable react/button-has-type */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '@d1.cx/components';
import {
  Container,
  Row,
  WrapperLottie,
  Wrapper,
  TableLoadingContainer,
  ModalitiesContainer,
  ModalityButtonCard,
  ModalitiesWrapper,
} from './styles';
import ModalityCard from './components/ModalityCard/ModalityCard';
import TableLoading from '../../components/Skeleton/TableLoading/TableLoading';
import { dispatch } from '../../Config/store';
import FullScreenModal from '../../components/FullScreenModal/index';
import ModalityInfoModal from './components/ModalityInfoModal';

import LottieNotification from '../../components/LottieNotification/LottieNotification';

const Journey = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const modalities = useSelector((state) => state.Modalities.modalities);

  const [openModalityInfoModal, setOpenModalityInfoModal] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [selectedModality, setSelectedModality] = useState({});

  /**
   * @function handleGetAllModalities
   * @description Bate na api e retorna todos as esteiras criadas
   */

  const handleGetAllModalities = useCallback(async () => {
    try {
      setloadingTable(true);
      await dispatch.Modalities.loadModalitiesByproductAsync(
        currentProductById,
      );
      setloadingTable(false);
    } catch (error) {
      console.error('Error', error);
    }
  }, [currentProductById]);

  useEffect(() => {
    handleGetAllModalities();
  }, [currentProductById]);

  return (
    <Container>
      <Wrapper>
        <Row>
          <PrimaryButton
            onClick={() => {
              setSelectedModality('');
              setOpenModalityInfoModal(true);
            }}
          >
            Nova esteira
          </PrimaryButton>
        </Row>

        {modalities.length > 0 && (
          <ModalitiesWrapper>
            <ModalitiesContainer>
              {modalities.map((modality) => (
                <ModalityButtonCard
                  onClick={() => {
                    setSelectedModality(modality);
                    setOpenModalityInfoModal(true);
                  }}
                >
                  <ModalityCard modality={modality.name} />
                </ModalityButtonCard>
              ))}
            </ModalitiesContainer>
          </ModalitiesWrapper>
        )}

        {!modalities.length && !loadingTable && (
          <ModalitiesWrapper>
            <WrapperLottie>
              <LottieNotification
                hiddenBg
                animation="lupa"
                description="Não há esteiras adicionadas!"
              />
            </WrapperLottie>
          </ModalitiesWrapper>
        )}

        {modalities.length === 0 && loadingTable && (
          <ModalitiesWrapper>
            <TableLoadingContainer>
              <TableLoading />
            </TableLoadingContainer>
          </ModalitiesWrapper>
        )}
      </Wrapper>

      <FullScreenModal open={openModalityInfoModal}>
        <ModalityInfoModal
          selectedModality={selectedModality}
          onClose={setOpenModalityInfoModal}
        />
      </FullScreenModal>
    </Container>
  );
};

export default Journey;
