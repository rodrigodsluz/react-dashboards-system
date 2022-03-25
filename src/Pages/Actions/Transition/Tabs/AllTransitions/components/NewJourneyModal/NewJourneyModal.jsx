/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import {
  Input, PrimaryButton, Spacing, Typography,
} from '@d1.cx/components';
import { ArrowLeft } from '@d1.cx/icons';

import SnackAlert from '../../../../../../../components/SnackAlert';
import {
  Container,
  WrapperInputs,
  Header,
  Click,
  Select,
  ContainerButton,
  Option,
} from './styles';
import { dispatch } from '../../../../../../../Config/store';

function NewJourneyModal({ modalities, onClose, currentProductById }) {
  const [journeyName, setJourneyName] = useState('');
  const [modalityId, setModalityId] = useState(0);

  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const INITIAL_ERRORS = {
    modalityId: false,
    journeyName: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const ERROR_CREATE_JOURNEY = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';
  const SUCCESS_CREATE = 'Tudo pronto! Sua jornada foi criada com sucesso.';
  const ERROR_MODALITY = 'Por favor, selecione uma esteira para criar uma jornada';

  /**
   * @function handleChangeJourneyName
   * @description Seta o nome da jornada
   */

  const handleChangeJourneyName = useCallback(
    ({ target }) => {
      setJourneyName(target.value);

      if (journeyName.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          journeyName: false,
        }));
      }
    },
    [journeyName],
  );

  /**
   * @function handleChangeSelectModality
   * @description Seta o Id da esteira selecionada
   */

  const handleChangeSelectModality = useCallback(
    ({ target }) => {
      setModalityId(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setErrors((prevState) => ({
          ...prevState,
          modalityId: false,
        }));
      }
    },
    [modalityId],
  );

  /**
   * @function handleChangeNotification
   * @description Desativa a notificação depois de 2 segundos
   */

  const handleChangeNotification = useCallback(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  }, [notification]);

  /**
   * @function handleCloseModalAfterCreating
   * @description Fecha o modal depois de 1 segundo
   */

  const handleCloseModalAfterCreating = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [notification]);

  /**
   * @function handleSubmitNewJourney
   * @description Faz a request para criar uma nova jornada
   */

  const handleSubmitNewJourney = useCallback(
    async (event) => {
      try {
        event?.preventDefault();

        setLoading(true);
        setErrors(INITIAL_ERRORS);

        if (journeyName.length < 1) {
          setErrors((prevState) => ({
            ...prevState,
            journeyName: true,
          }));
        }

        if (parseInt(modalityId, 10) === 0) {
          setErrors((prevState) => ({
            ...prevState,
            modalityId: true,
          }));
        }

        const data = {
          name: journeyName,
          modality_id: parseInt(modalityId, 10),
        };

        await dispatch.Journeys.createJourneyAsync(data);
        await dispatch.Journeys.loadJourneysByProductAsync(currentProductById);
        setMessage(SUCCESS_CREATE);
        setNotification(true);
        setError(false);
        setJourneyName('');
        setModalityId('');
        handleCloseModalAfterCreating();
      } catch (e) {
        setError(true);
        setMessage(ERROR_CREATE_JOURNEY);
        setLoading(false);
      }
    },
    [journeyName, modalityId, modalities, currentProductById],
  );

  useEffect(() => {
    handleChangeNotification();
  }, [notification]);

  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose}>
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          NOVA JORNADA
          {' '}
        </Typography>
      </Header>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Nome da jornada:
        </Typography>
        <Input
          placeholder="Nome da jornada"
          value={journeyName}
          onChange={handleChangeJourneyName}
          error={errors.journeyName}
        />
      </WrapperInputs>

      {modalities && (
        <WrapperInputs>
          <Typography fontSize="16px" vertical="5px">
            Esteira
          </Typography>
          <Select onChange={handleChangeSelectModality} value={modalityId}>
            <Option value="0">Selecione uma esteira</Option>

            {modalities.map((modality) => (
              <Option value={modality.id}>{modality.name}</Option>
            ))}
          </Select>
          {errors.modalityId && (
            <Typography color="#f27457" fontSize="12px" vertical="4px">
              {ERROR_MODALITY}
            </Typography>
          )}
        </WrapperInputs>
      )}
      <Typography fontSize="12px" vertical="4px">
        Apenas as esteiras que ainda não foram utilizadas são exibidas
      </Typography>

      <Spacing vertical="10px" />
      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitNewJourney}
          loading={loading}
          disabled={loading}
        >
          Salvar
        </PrimaryButton>
      </ContainerButton>
      <Spacing vertical="10px" />
      <SnackAlert
        open={notification}
        handleClose={handleChangeNotification}
        severity={error ? 'error' : 'success'}
        message={message}
      />
    </Container>
  );
}

export default NewJourneyModal;
