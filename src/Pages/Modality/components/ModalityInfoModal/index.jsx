/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';

import { ArrowLeft, MinusCircle, PlusCircle } from '@d1.cx/icons';
import {
  PrimaryButton,
  FlexContent,
  Typography,
  Input as D1Input,
  LinkButton,
  Spacing,
} from '@d1.cx/components';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import ConfirmationContent from '../../../../components/ConfirmationContent';
import Modal from '../../../../components/Modal';
import SnackAlert from '../../../../components/SnackAlert';
import WeekSchedule from '../WeekSchedule/WeekSchedule';
import HolidayPicker from '../HolidayPicker/HolidayPicker';
import RightModal from '../../../../components/RightModal/RightModal';
import AddModalityModal from '../AddModalityModal/AddModalityModal';
import { useModal } from '../../../../hooks/useModal';

import {
  Container,
  Header,
  Click,
  InputItem,
  InputsWrapper,
  InputsContainer,
  LeftContainer,
  ContentContainer,
  useStyles,
  HolidayPickerWrapper,
  StartsOnContainer,
  OutlineButton,
  InputWrapper,
  TimeWrapper,
  BackMenuContainer,
  BackButtonsWrapper,
  StartsOnErrorMessage,
} from './styles';
import { dispatch } from '../../../../Config/store';

const ModalityInfoModal = ({ onClose, selectedModality }) => {
  let holidays = useSelector((state) => state.Modalities.holidays);
  let week = useSelector((state) => state.Modalities.week);
  const noHolidays = useSelector((state) => state.Modalities.noHolidays);

  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const classes = useStyles();

  const [notification, setNotification] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [modalityName, setModalityName] = useState(selectedModality.name || '');
  const [startsOn, setStartsOn] = useState(
    selectedModality?.sla_config?.starts_on || 0,
  );
  const [holidaysMenu, setHolidaysMenu] = useState(null);
  const [backMenu, setBackMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { isShownModal, toggleModal } = useModal();

  const INITIAL_ERRORS = {
    modalityName: false,
    startsOn: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const ERROR_CREATE_MODALITY = 'Alguma coisa de errada aconteceu! Tente novamente.';
  const SUCCESS_CREATE = 'Esteira criada com sucesso.';
  const SUCCESS_UPDATE = 'Esteira atualizada com sucesso.';
  const ERROR_STARTS_ON = 'Deve ser maior ou igual a 0.';
  const CREATE_MODALITY = 'Criação de esteira.';
  const UPDATE_MODALITY = 'Atualização de esteira.';
  const CONFIRM_MODALITY = 'Realmente deseja continuar? As operações realizadas podem acarretar em comportamentos indesejados!';
  const EMPTY_TIME = 'Selecione pelo menos um horário!!!';
  const ERROR_MODALITY_NAME = 'O nome não pode estar vazio';

  /**
   * @function handleOpenMenu
   * @description Ativa o menu de hamburguer dos botões
   */
  const handleOpenMenu = (menu) => (event) => {
    menu === 'back'
      ? setBackMenu(event.currentTarget)
      : setHolidaysMenu(event.currentTarget);
  };

  /**
   * @function handleCloseMenu
   * @description Fecha o menu de hamburguer dos botões
   */
  const handleCloseMenu = (menu) => () => {
    menu === 'back' ? setBackMenu(null) : setHolidaysMenu(null);
  };

  const handleChangeModalityName = useCallback(
    ({ target }) => {
      setModalityName(target.value);

      if (modalityName.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          modalityName: false,
        }));
      }
    },
    [modalityName],
  );

  /**
   * @function handleSubtractStartsOn
   * @description Diminui em 1 o valor do StartsOn
   */

  const handleSubtractStartsOn = useCallback(() => {
    if (startsOn > 0) {
      setStartsOn(startsOn - 1);
    }
    if (errors.startsOn) {
      setStartsOn(0);
      setErrors((prevState) => ({
        ...prevState,
        startsOn: false,
      }));
    }
  }, [startsOn, errors.startsOn]);

  /**
   * @function handleChangeStartsOn
   * @description Seta o valor digitado no input do StartsOn
   */

  const handleChangeStartsOn = useCallback(
    ({ target }) => {
      setStartsOn(parseInt(target.value, 10));
      if (parseInt(target.value, 10)) {
        setErrors((prevState) => ({
          ...prevState,
          startsOn: false,
        }));
      }
      if (Number.isNaN(startsOn) || startsOn < 0) {
        setStartsOn(0);
        setErrors((prevState) => ({
          ...prevState,
          startsOn: false,
        }));
      }
    },
    [startsOn],
  );

  /**
   * @function handleAddStartsOn
   * @description Aumenta em 1 o valor do StartsOn
   */

  const handleAddStartsOn = useCallback(() => {
    setStartsOn(startsOn + 1);
    if (errors.startsOn) {
      setStartsOn(0);
      setErrors((prevState) => ({
        ...prevState,
        startsOn: false,
      }));
    }
  }, [startsOn, errors.startsOn]);

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
   * @function handleSubmitNewJourney
   * @description Faz a request para criar uma nova jornada
   */

  const handleSubmitNewModality = useCallback(async (event) => {
    try {
      event?.preventDefault();

      setLoading(true);
      setErrors(INITIAL_ERRORS);

      if (modalityName.length < 1) {
        setErrors((prevState) => ({
          ...prevState,
          modalityName: true,
        }));
      }

      const createData = {
        name: modalityName,
        product_id: currentProductById,
        sla_config: {
          week,
          holidays,
          starts_on: startsOn,
        },
      };

      if (
        Object.keys(week).length
        || (selectedModality
          && Object.keys(selectedModality?.sla_config?.week).length)
      ) {
        if (!selectedModality) {
          await dispatch.Modalities.createNewModality(createData);
        } else {
          if (!Object.keys(week).length) {
            week = selectedModality?.sla_config?.week;
          }

          if (
            !holidays.length
            && selectedModality?.sla_config?.holidays.length
            && !noHolidays
          ) {
            holidays = selectedModality?.sla_config?.holidays;
          }

          const updateData = {
            id: selectedModality.id,
            sla_config: {
              week,
              holidays,
              starts_on: startsOn,
            },
          };

          await dispatch.Modalities.updateModalityAsync(updateData);
        }

        await dispatch.Modalities.loadModalitiesByproductAsync(
          currentProductById,
        );

        if (!selectedModality) {
          setMessage(SUCCESS_CREATE);
        } else {
          setMessage(SUCCESS_UPDATE);
        }

        setNotification(true);
        setError(false);
        handleCloseModalAfterCreating();
      } else {
        setMessage(EMPTY_TIME);
        setError(true);

        setNotification(true);
      }
    } catch (e) {
      setError(true);
      setMessage(ERROR_CREATE_MODALITY);
    } finally {
      setLoading(false);
    }
  });

  /**
   * @function handleConfirmModality
   * @description Abre o modal para confirmar a criação ou atualização da esteira
   */
  const handleConfirmModality = useCallback(() => {
    setTitle(selectedModality ? UPDATE_MODALITY : CREATE_MODALITY);
    setMessage(CONFIRM_MODALITY);
    toggleModal();
  });

  /**
   * @function handleCloseModal
   * @description Fecha o modal
   */
  const handleCloseModal = useCallback(async () => {
    onClose(false);

    week = {};

    await dispatch.Modalities.setWeek(week);
    await dispatch.Modalities.loadModalitiesByproductAsync(currentProductById);

    await dispatch.Modalities.setIsDeleted(false);
  }, []);

  return (
    <>
      {/** confirm modality modal */}
      <Modal
        title={title}
        open={isShownModal}
        handleClose={() => toggleModal()}
        content={<ConfirmationContent messageOne={message} />}
        confirm={handleSubmitNewModality}
      />
      {/** end confirm modality modal */}
      <Container>
        <Header spaceBetween>
          <FlexContent>
            <Click
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleOpenMenu('back')}
              data-testid="back-icon"
            >
              <ArrowLeft color="#575757" />
            </Click>

            <Menu
              id="simple-menu"
              anchorEl={backMenu}
              keepMounted
              open={Boolean(backMenu)}
              onClose={handleCloseMenu('back')}
              className={classes.menu}
              MenuListProps={{ onMouseLeave: handleCloseMenu('back') }}
            >
              <MenuItem style={{ background: 'white' }}>
                <BackMenuContainer>
                  <Typography bold fontSize="19px" vertical="15px">
                    Tem certeza que realmente deseja voltar?
                  </Typography>

                  <Typography fontSize="16px" vertical="15px">
                    Ao voltar os dados modificados e não salvos serão
                    <br />
                    descartados!
                  </Typography>

                  <BackButtonsWrapper>
                    <OutlineButton onClick={handleCloseMenu('back')}>
                      Cancelar
                    </OutlineButton>

                    <PrimaryButton onClick={handleCloseModal}>
                      Confirmar
                    </PrimaryButton>
                  </BackButtonsWrapper>
                </BackMenuContainer>
              </MenuItem>
            </Menu>
            <Typography fontSize="25px" vertical="40px" horizontal="10px">
              Voltar
            </Typography>
          </FlexContent>
        </Header>
        <InputsContainer>
          <InputsWrapper>
            <InputItem>
              <InputWrapper>
                <Typography fontSize="19px">Nome</Typography>
                <D1Input
                  disabled={selectedModality}
                  placeholder="Nome da esteira"
                  value={modalityName}
                  onChange={handleChangeModalityName}
                  error={errors.modalityName}
                  errorMessage={ERROR_MODALITY_NAME}
                />
              </InputWrapper>
            </InputItem>

            <InputItem>
              <Typography fontSize="19px">Inicia-se em</Typography>
              <StartsOnContainer>
                <LinkButton
                  onClick={handleSubtractStartsOn}
                  id="minus"
                  style={{ padding: '12px 5px' }}
                >
                  <MinusCircle width="25px" color="#000" />
                </LinkButton>
                <input
                  type="number"
                  value={startsOn}
                  onChange={handleChangeStartsOn}
                  min="0"
                />
                <LinkButton
                  onClick={handleAddStartsOn}
                  id="plus"
                  style={{ padding: '5px' }}
                >
                  <PlusCircle width="25px" color="#000" />
                </LinkButton>
              </StartsOnContainer>
              {errors.startsOn && (
                <StartsOnErrorMessage>{ERROR_STARTS_ON}</StartsOnErrorMessage>
              )}
            </InputItem>

            <InputItem>
              <HolidayPickerWrapper>
                <OutlineButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu('holidays')}
                >
                  Feriados
                </OutlineButton>
                <Menu
                  id="simple-menu"
                  anchorEl={holidaysMenu}
                  keepMounted
                  open={Boolean(holidaysMenu)}
                  onClose={handleCloseMenu('holidays')}
                  className={classes.menu}
                  MenuListProps={{ onMouseLeave: handleCloseMenu('holidays') }}
                >
                  <MenuItem style={{ background: 'white' }}>
                    <HolidayPicker
                      selectedHolidays={selectedModality?.sla_config?.holidays}
                    />
                  </MenuItem>
                </Menu>
              </HolidayPickerWrapper>
            </InputItem>

            <Spacing horizontal="10px" />

            <InputItem>
              <OutlineButton onClick={() => setOpenModal(true)}>
                Horários
              </OutlineButton>
            </InputItem>

            <TimeWrapper>
              <InputItem>
                <PrimaryButton
                  loading={loading}
                  disabled={loading}
                  onClick={handleConfirmModality}
                >
                  {!selectedModality
                    ? 'Criar esteira'
                    : 'Atualizar esteira'}
                </PrimaryButton>
              </InputItem>
            </TimeWrapper>
          </InputsWrapper>
        </InputsContainer>

        <ContentContainer>
          <LeftContainer>
            <WeekSchedule selectedWeek={selectedModality?.sla_config?.week} />
          </LeftContainer>

          <RightModal open={openModal}>
            <AddModalityModal
              onClose={() => setOpenModal(false)}
              selectedWeek={selectedModality?.sla_config?.week}
              handleSubmitNewModality={handleConfirmModality}
              loading={loading}
              selectedModality={selectedModality}
              setMessage={setMessage}
              setError={setError}
              setNotification={setNotification}
            />
          </RightModal>
          <SnackAlert
            open={notification}
            handleClose={handleChangeNotification}
            severity={error ? 'error' : 'success'}
            message={message}
          />
        </ContentContainer>
      </Container>
    </>
  );
};

export default ModalityInfoModal;
