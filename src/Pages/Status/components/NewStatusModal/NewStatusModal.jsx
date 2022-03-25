/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import {
  FlexContent,
  Input,
  LinkButton,
  PrimaryButton,
  Spacing,
  Typography,
} from '@d1.cx/components';
import { ArrowLeft, MinusCircle, PlusCircle } from '@d1.cx/icons';
import { useSelector } from 'react-redux';
import {
  Container,
  WrapperInputs,
  Header,
  Click,
  ContainerButton,
  Select,
  ColorPicker,
  WrapperColorPickers,
  PreviewStatus,
  SLA,
  ContainerSLA,
  Option,
  ContentWrapper,
  SelectWrapper,
  PreviewLabel,
} from './styles';
import SnackAlert from '../../../../components/SnackAlert';
import SelectButton from '../../../../components/SelectButton/SelectButton';
import useNewStatus from './useNewStatus';

function NewStatusModal({ onClose }) {
  const products = useSelector((state) => state.User.allProducts);
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const {
    statusName,
    errors,
    category,
    sla,
    description,
    colorBg,
    colorText,
    loading,
    message,
    handleChangeStatusName,
    handleChangeCategory,
    handleChangeDescription,
    handleSubtractSLA,
    handleChangeBackgroundColorStatus,
    handleChangeTextColorStatus,
    handleSubmitNewStatus,
    handleChangeNotification,
    ERROR_PRODUCT,
    ERROR_STATUS_NAME,
    ERROR_DESCRIPTION,
    ERROR_COLORS,
    ERROR_SLA,
    handleGetAllStatus,
    handleAddSLA,
    handleChangeSLA,
    notification,
    error,
    success,
  } = useNewStatus();

  const handleCloseModalAfterCreating = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [notification]);

  useEffect(() => {
    handleGetAllStatus();
  }, [currentProductById]);

  useEffect(() => {
    if (success) {
      handleCloseModalAfterCreating();
    }
  }, [notification]);
  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose} data-testid="back-icon">
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          NOVO STATUS
          {' '}
        </Typography>
      </Header>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Nome do status
        </Typography>
        <Input
          placeholder="Nome do status"
          value={statusName}
          onChange={handleChangeStatusName}
          errorMessage={ERROR_STATUS_NAME}
          error={errors.statusName}
          required
          data-testid="txtNome"
        />
      </WrapperInputs>

      {products && (
        <WrapperInputs>
          <Typography fontSize="16px" vertical="5px">
            Área
          </Typography>
          <Select value={currentProductById} disabled>
            {products.map((prod) => (
              <Option value={prod.id}>{prod.name}</Option>
            ))}
          </Select>
          {errors.product && (
            <Typography color="#f27457" fontSize="12px" vertical="4px">
              {ERROR_PRODUCT}
            </Typography>
          )}
        </WrapperInputs>
      )}

      <Spacing vertical="10px" />

      <ContentWrapper>
        <FlexContent width="500px">
          <Typography fontSize="16px" vertical="5px">
            Categoria:
          </Typography>
        </FlexContent>
        <WrapperInputs>
          <SelectWrapper>
            <SelectButton
              name="Primary"
              chanceCategory={handleChangeCategory}
              category={category}
              data-testid="btnPrimary"
            />
            <SelectButton
              name="Valid"
              chanceCategory={handleChangeCategory}
              category={category}
              data-testid="btnValid"
            />
            <SelectButton
              name="Pause"
              chanceCategory={handleChangeCategory}
              category={category}
              data-testid="btnPause"
            />
          </SelectWrapper>
          <SelectWrapper>
            <SelectButton
              name="Invalid"
              chanceCategory={handleChangeCategory}
              category={category}
              data-testid="btnInvalid"
            />
            <SelectButton
              name="Final"
              chanceCategory={handleChangeCategory}
              category={category}
              data-testid="btnFinal"
            />
          </SelectWrapper>
        </WrapperInputs>
      </ContentWrapper>

      <FlexContent width="500px" direction="column">
        <Typography fontSize="16px" vertical="15px">
          SLA:
        </Typography>
        <ContainerSLA>
          <LinkButton onClick={handleSubtractSLA} id="minus">
            <MinusCircle width="30px" color="#000" />
            {' '}
          </LinkButton>
          <SLA type="number" value={sla} onChange={handleChangeSLA} min="0" />
          <LinkButton onClick={handleAddSLA} id="plus">
            <PlusCircle width="30px" color="#000" />
          </LinkButton>
        </ContainerSLA>
        {errors.sla && (
          <Typography color="#f27457" fontSize="12px" vertical="4px">
            {ERROR_SLA}
          </Typography>
        )}
      </FlexContent>
      <Spacing vertical="10px" />

      <Spacing vertical="10px" />
      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Descrição:
        </Typography>
        <textarea
          placeholder="Escreva brevemente sobre o grupo"
          onChange={handleChangeDescription}
          value={description}
          data-testid="txtDescricao"
        />
        {errors.description && (
          <Typography color="#f27457" fontSize="12px" vertical="4px">
            {ERROR_DESCRIPTION}
          </Typography>
        )}
      </WrapperInputs>
      <Spacing vertical="10px" />

      <PreviewLabel>
        <Typography fontSize="16px" vertical="5px">
          Preview:
        </Typography>
      </PreviewLabel>
      <PreviewStatus value={colorBg}>
        <Typography color={colorText}>Status</Typography>
      </PreviewStatus>
      <WrapperColorPickers>
        <FlexContent direction="column">
          <Typography fontSize="16px" vertical="5px">
            Cor de fundo:
          </Typography>
          <ColorPicker
            type="color"
            onChange={handleChangeBackgroundColorStatus}
            value={colorBg}
          />
        </FlexContent>
        <FlexContent direction="column">
          <Typography fontSize="16px" vertical="5px">
            Cor de texto:
          </Typography>
          <ColorPicker
            type="color"
            onChange={handleChangeTextColorStatus}
            value={colorText}
          />
        </FlexContent>
      </WrapperColorPickers>
      {errors.colors && (
        <Typography color="#f27457" fontSize="12px" vertical="4px">
          {ERROR_COLORS}
        </Typography>
      )}
      <Spacing vertical="10px" />
      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitNewStatus}
          disabled={loading}
          loading={loading}
          data-testid="btnSalvar"
        >
          Salvar
        </PrimaryButton>
      </ContainerButton>
      <Spacing vertical="30px" />
      <SnackAlert
        open={notification}
        handleClose={handleChangeNotification}
        severity={error ? 'error' : 'success'}
        message={message}
      />
    </Container>
  );
}

export default NewStatusModal;
