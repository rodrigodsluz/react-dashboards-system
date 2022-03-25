/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Box from '@material-ui/core/Box';

import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

import Input from '@material-ui/core/Input';

import {
  ArrowLeft,
  ChevronCircleLeft,
  Edit,
  TimesCircle,
  TrashAlt,
} from '@d1.cx/icons';
import {
  FlexContent,
  LinkButton,
  PrimaryButton,
  Tooltip,
  Typography,
  Input as D1Input,
  OutlineButton,
} from '@d1.cx/components';
import Modal from '../../../../components/Modal';
import ExcludeContent from '../../../../components/ExcludeContent';

import SnackAlert from '../../../../components/SnackAlert';
import Badge from '../../../../components/Badge';

import { useModal } from '../../../../hooks/useModal';

import { dispatch } from '../../../../Config/store';

import {
  useStyles,
  getItemStyle,
  getListStyle,
  Container,
  Header,
  Click,
  Wrapper,
  Row,
  Body,
  WrapperItem,
  StepItem,
  StepForm,
  Card,
  HeaderForm,
  WrapperInputs,
  LimitButton,
} from './styles';
import JourneyPreview from './components/JourneyPreview/JourneyPreview';

const StepsModal = ({ data, onClose, productId }) => {
  const classes = useStyles();

  const [journeyName, setJourneyName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [selectedStep, setSelectedStep] = useState();
  const [selectedName, setSelectedName] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [errorJourneyName, setErrorJourneyName] = useState(false);
  const [protocol, setProtocol] = useState('');
  const { isShownModal, toggleModal } = useModal();
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    confirm: () => {},
  });
  const [showEditingAlert, setShowEditingAlert] = useState(false);

  const [steps, setSteps] = useState([]);

  const journey = useSelector((state) => state.Journeys.details);
  const storedSteps = useMemo(() => journey?.step, [journey]);

  useEffect(() => {
    if (storedSteps) {
      setSteps(storedSteps);
    }
  }, [storedSteps]);

  const { relatedStatuses, unrelatedStatuses } = useSelector(
    (state) => state.Journeys.statuses,
  );

  useEffect(() => {
    dispatch.Journeys.loadJourneyByIdAsync(data.id);
    dispatch.Journeys.loadStatusesAsync(data.id);
  }, [data]);

  const toggleEditingName = () => {
    if (!editingName) setJourneyName(journey.name);
    setEditingName(!editingName);
  };

  const handleChangeProtocol = useCallback(
    ({ target }) => {
      if (target.value.length > 0) { setProtocol(target.value.trim()); }
    },
    [protocol],
  );

  const handleSaveName = async () => {
    setEditingName('loading');
    setLoading(true);

    if (journeyName.length > 0) {
      setErrorJourneyName(false);
      await dispatch.Journeys.updateJourneyAsync({
        id: journey.id,
        name: journeyName,
      });
      await dispatch.Journeys.loadJourneyByIdAsync(journey.id);
      await dispatch.Journeys.loadJourneysByProductAsync(productId);
      setEditingName(false);
    } else {
      setErrorJourneyName(true);
    }

    setLoading(false);
  };

  const handleStatusChange = ({ target: { value } }) => {
    setSelectedStatuses(value);
    setModified(true);
  };

  const handleNameChange = ({ target: { value } }) => {
    setSelectedName(value);
    setModified(true);
  };

  const handleAgentChange = ({ target: { value } }) => {
    setSelectedAgent(value);
    setModified(true);
  };

  const selectedStepObj = useMemo(() => {
    if (selectedStep === -1) {
      return { id: -1, name: 'Novo Passo', status_id: [] };
    }
    return steps?.[selectedStep];
  }, [selectedStep]);

  const handleSelectStep = (stepIndex) => () => {
    if (typeof selectedStep !== 'number' || !modified) {
      setSelectedStep(stepIndex);
      setModified(false);
    } else {
      setShowEditingAlert(true);
    }
  };

  const handleSaveStep = async () => {
    setLoading('save');

    const payload = {
      journey_id: journey.id,
      name: selectedName,
      status_id: selectedStatuses,
      agent: selectedAgent,
    };

    if (selectedStep === -1) {
      const stepsOrders = steps.map((step) => step.order).sort();
      payload.order = (stepsOrders[stepsOrders.length - 1] ?? 0) + 1;
      await dispatch.Step.createStepAsync(payload);
    } else {
      payload.id = steps[selectedStep].id;
      await dispatch.Step.updateStepAsync(payload);
    }
    await Promise.all([
      dispatch.Journeys.loadStatusesAsync(journey.id),
      dispatch.Step.loadStepsAsync(),
      dispatch.Journeys.loadJourneyByIdAsync(journey.id),
    ]);
    setSelectedStep();
    setLoading(false);
  };

  const showDeleteJourneyModal = (e) => {
    e.preventDefault();
    setModalData({
      title: 'Deletar Jornada',
      message: `Deseja deletar a Jornada: ${journey?.name}`,
      confirm: async () => {
        await dispatch.Journeys.deleteJourneyByIdAsync(journey.id);
        await dispatch.Journeys.loadJourneysByProductAsync(productId);
        onClose();
      },
    });
    toggleModal();
  };

  const showDeleteStepModal = (e) => {
    e.preventDefault();
    setModalData({
      title: 'Deletar Passo',
      message: `Deseja deletar esse passo: ${steps[selectedStep]?.name || selectedName} `,
      confirm: async () => {
        if (selectedStep !== -1) {
          setLoading('delete');
          await dispatch.Step.deleteStep({ id: steps[selectedStep].id });

          await dispatch.Step.loadStepsAsync();
          await dispatch.Journeys.loadJourneyByIdAsync(journey.id);
        }
        setLoading(false);
        setSelectedStep();
      },
    });
    toggleModal();
  };

  const showDiscardStepModal = () => {
    if (modified) {
      setModalData({
        title: 'Descartar Passo',
        message: 'Deseja descartar as alterações desse passo',
        confirm: () => setSelectedStep(),
      });
      toggleModal();
    } else {
      setSelectedStep();
    }
  };

  const stepStatus = useMemo(
    () => (selectedStep !== -1
      ? selectedStepObj?.statusStep.map((statusStep) => relatedStatuses.find((status) => status.id === statusStep.status_id))
      : []),
    [selectedStepObj],
  );

  useEffect(() => {
    const step = selectedStepObj;
    setSelectedName(step?.name ?? '');
    setSelectedStatuses(
      step?.statusStep?.map((statusStep) => statusStep.status_id) ?? [],
    );
    setSelectedAgent(step?.agent ?? '');
  }, [selectedStep]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const oldSelectedId = selectedStepObj?.id;

    const ordering = Array.from(steps);
    const [moved] = ordering.splice(result.source.index, 1);
    ordering.splice(result.destination.index, 0, moved);

    setSteps(ordering);
    if (oldSelectedId) {
      setSelectedStep(ordering.findIndex((step) => step.id === oldSelectedId));
    }

    dispatch.Journeys.updateJourneyAsync({
      id: journey.id,
      step_id: ordering.map((step) => step.id),
    });
  };
  return (
    <>
      <JourneyPreview
        open={openPreview}
        onClose={setOpenPreview}
        protocol={protocol}
        reset={setProtocol}
      />

      <Container>
        <SnackAlert
          open={showEditingAlert}
          handleClose={() => setShowEditingAlert(false)}
          severity="warning"
          message="Salve ou descarte o passo atual antes de selecionar outro."
        />

        <Modal
          title={modalData.title}
          open={isShownModal}
          handleClose={toggleModal}
          confirm={modalData.confirm}
          content={
            <ExcludeContent messageOne={modalData.message} messageTwo="" />
          }
        />

        <Header spaceBetween>
          <FlexContent>
            <Click
              onClick={() => {
                setSteps([]);
                onClose(false);
              }}
              data-testid="back-icon"
            >
              <ArrowLeft color="#575757" />
            </Click>
            <Typography fontSize="25px" vertical="40px" horizontal="10px">
              {journey?.name}
              {' '}
            </Typography>
          </FlexContent>

          <Wrapper>
            <Tooltip content="Deletar" bottom>
              <LinkButton onClick={showDeleteJourneyModal} data-testid="btnExcluirJornada">
                <TrashAlt color="red" width="25px" />
              </LinkButton>
            </Tooltip>
            <Tooltip content="Renomear" bottom>
              {!editingName ? (
                <LinkButton
                  onClick={toggleEditingName}
                  loading={editingName === 'loading'}
                  data-testid="btnRenomearJornada"
                >
                  <Edit color="#8e8e93" width="25px" />
                </LinkButton>
              ) : (
                <Wrapper>
                  <D1Input
                    placeholder="Novo nome da jornada"
                    value={journeyName}
                    onChange={({ target: { value } }) => setJourneyName(value)}
                    error={errorJourneyName}
                    errorMessage="Esse campo não pode ser vazio"
                  />
                  <LinkButton
                    onClick={handleSaveName}
                    loading={loading}
                    disabled={loading}
                  >
                    Salvar
                  </LinkButton>
                </Wrapper>
              )}
            </Tooltip>
            <PrimaryButton onClick={handleSelectStep(-1)} data-testid="btnAdicionarPasso">
              Adicionar passo
            </PrimaryButton>
          </Wrapper>
        </Header>
        <Body>
          <Row>
            <Wrapper>
              <D1Input
                placeholder="Número do protocolo"
                value={protocol}
                onChange={handleChangeProtocol}
                data-testid="txtNumeroProtocol"
              />
              <PrimaryButton
                onClick={() => setOpenPreview(protocol.length > 0)}
                loading={loading}
                disabled={loading}
                data-testid="btnVisualCliente"
              >
                Ver como cliente
              </PrimaryButton>
            </Wrapper>
          </Row>

          {steps && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(dropProvided, dropSnapshot) => (
                  <div
                    ref={dropProvided.innerRef}
                    style={getListStyle(dropSnapshot.isDraggingOver)}
                    {...dropProvided.droppableProps}
                  >
                    {[
                      ...steps,
                      ...(selectedStep === -1 ? [selectedStepObj] : []),
                    ].map((item, index) => {
                      const active = index === selectedStep
                        || (selectedStep === -1 && index === steps.length);

                      return (
                        <Draggable
                          key={item.id}
                          draggableId={`${item.id}`}
                          index={index}
                          isDragDisabled={item.id === -1}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <WrapperItem
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              style={getItemStyle(
                                dragSnapshot.isDragging,
                                dragProvided.draggableProps.style,
                              )}
                              onClick={
                                selectedStep !== index
                                  ? handleSelectStep(index)
                                  : null
                              }
                            >
                              <StepItem
                                active={selectedStep === index || active}
                              >
                                <Typography
                                  color={
                                    selectedStep === index || active
                                      ? '#fff'
                                      : '#000'
                                  }
                                  fontSize="15px"
                                >
                                  {index + 1}
                                </Typography>
                              </StepItem>
                              {item.name}
                            </WrapperItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {dropProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {selectedStepObj && (
            <StepForm>
              <Card maxWidth="lg">
                <HeaderForm>
                  <Tooltip content="Voltar para timeline" top whiteSpace>
                    <Click onClick={showDiscardStepModal} disabled={!!loading} data-testid="btnFecharPasso">
                      <ChevronCircleLeft color="#575757" />
                    </Click>
                  </Tooltip>
                  <Typography fontSize="18px" vertical="30px" horizontal="5px">
                    Configuração do passo
                    {' '}
                  </Typography>
                  <Tooltip content="Deletar passo" top whiteSpace>
                    <LinkButton
                      onClick={showDeleteStepModal}
                      disabled={!!loading}
                      data-testid="btnDeletarPasso"
                    >
                      <TimesCircle color="red" width="25px" />
                    </LinkButton>
                  </Tooltip>
                </HeaderForm>
                <FlexContent direction="column">
                  <WrapperInputs>
                    <Typography fontSize="15px" vertical="5px" bold>
                      Nome da jornada
                    </Typography>
                    <D1Input
                      placeholder="Nome do passo"
                      variant="outlined"
                      value={selectedName}
                      onChange={handleNameChange}
                      data-testid="txtNomePasso"
                    />
                  </WrapperInputs>

                  <WrapperInputs>
                    <Typography fontSize="15px" vertical="5px" bold>
                      Nome do responsavel
                    </Typography>
                    <D1Input
                      placeholder="Nome do responsável"
                      value={selectedAgent}
                      onChange={handleAgentChange}
                      data-testid="txtNomeResponsavel"
                    />
                  </WrapperInputs>
                </FlexContent>
                <WrapperInputs>
                  <Typography fontSize="15px" bold>
                    Status
                  </Typography>
                  <FormControl variant="outlined" style={{ width: '100%' }}>
                    <Select
                      labelId="status-select-label"
                      multiple
                      value={selectedStatuses}
                      onChange={handleStatusChange}
                      label="Status"
                      data-testid="dropdownStatus"
                      input={(
                        <Input
                          id="select-multiple-chip"
                          className={classes.input}
                          disableUnderline
                        />
                      )}
                      renderValue={(selected) => (
                        <Box className={classes.badges}>
                          {selected.map((id, index) => {
                            const status = [
                              ...stepStatus,
                              ...unrelatedStatuses,
                            ].find((item) => item.id === id);
                            return (
                              <Badge
                                key={status?.id ?? `badge-${index}`}
                                content={status?.name ?? ''}
                                textColor={status?.styles.color}
                                backgroundColor={status?.styles.backgroundColor}
                              />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {[...unrelatedStatuses, ...stepStatus].map(
                        ({ id, name }) => (
                          <MenuItem key={`status-${id}`} value={id}>
                            {name}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </WrapperInputs>
                <LimitButton>
                  <OutlineButton
                    onClick={handleSaveStep}
                    disabled={loading || !selectedName?.length}
                    data-testid="btnSalvarAlteracoes"
                  >
                    Salvar alterações
                  </OutlineButton>
                </LimitButton>
              </Card>
            </StepForm>
          )}
        </Body>
      </Container>
    </>
  );
};

export default StepsModal;
