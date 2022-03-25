/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
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
  Option,
  Header,
  Click,
  ContainerButton,
  Select,
  ColorPicker,
  WrapperColorPickers,
  PreviewStatus,
  SLA,
  ContainerSLA,
  Title,
  ContentWrapper,
  SelectWrapper,
  PreviewLabel,
} from './styles';
import SnackAlert from '../../../../components/SnackAlert';
import SelectButton from '../../../../components/SelectButton/SelectButton';
import { dispatch } from '../../../../Config/store';
import colors from '../../../../theme/colors';

function UpdateStatusModal({
  onClose, status, resetPage, resetFilter,
}) {
  const products = useSelector((state) => state.User.allProducts);
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const [statusId, setStatusId] = useState(status?.id);
  const [statusName, setStatusName] = useState(status?.status);
  const [description, setDescription] = useState('');
  const [product, setProduct] = useState('0');
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(
    status?.backgroundColor,
  );
  const [colorText, setColorText] = useState(status?.color);
  const [category, setCategory] = useState('');
  const [sla, setSla] = useState(status?.sla);

  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notCompleteCreating, setNotCompleteCreating] = useState(false);
  const INITIAL_ERRORS = {
    description: false,
    product: false,
    category: false,
    statusName: false,
    sla: false,
    colors: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const ERROR_STATUS_NAME = 'O nome do status não pode estar vazio.';
  const ERROR_PRODUCT = 'Por favor, selecione uma área para continuar.';
  const ERROR_DESCRIPTION = 'Para melhorar sua experiência futuramente, preencha a descrição do status.';
  const ERROR_SLA = 'SLA é um valor em horas e por isso precisa ser maior ou igual a zero.';
  const ERROR_CREATE = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';
  const ERROR_COLORS = 'Hmmm! Não é possivel selecionar as duas cores iguais!';
  const SUCCESS_CREATE = 'Tudo pronto! Seu status foi atualizado com sucesso.';

  const handleChangeStatus = useCallback(() => {
    if (status) {
      setStatusId(status.id);
      setStatusName(status.status);
      setSla(status.sla);
      setCategory(status.category);
      setDescription(status.description);
      setProduct(status.product.id);
      setBackgroundColor(status.backgroundColor);
      setColorText(status.color);
    }
  }, [status]);

  /**
   * @function handleChangeStatusName
   * @description Seta o nome do status
   */

  const handleChangeStatusName = useCallback(
    ({ target }) => {
      setStatusName(target.value);

      if (statusName.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          statusName: false,
        }));
      }
    },
    [statusName],
  );

  /**
   * @function handleChangeSelectProduct
   * @description Seta o Id da área selecionado
   */

  const handleChangeSelectProduct = useCallback(
    ({ target }) => {
      setProduct(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setErrors((prevState) => ({
          ...prevState,
          product: false,
        }));
      }
    },
    [product],
  );

  /**
   * @function handleChangeBackgroundColorStatus
   * @description Seta a cor de fundo na preview do status
   */

  const handleChangeBackgroundColorStatus = useCallback(
    ({ target }) => {
      setBackgroundColor(target.value);
      if (target.value !== colorText) {
        setErrors((prevState) => ({
          ...prevState,
          colors: false,
        }));
      }
    },
    [backgroundColor, colorText],
  );

  /**
   * @function handleChangeTextColorStatus
   * @description Seta a cor do fundo do status do preview
   */

  const handleChangeTextColorStatus = useCallback(
    ({ target }) => {
      setColorText(target.value);
      if (target.value !== backgroundColor) {
        setErrors((prevState) => ({
          ...prevState,
          colors: false,
        }));
      }
    },
    [colorText, backgroundColor],
  );

  /**
   * @function handleChangeSLA
   * @description Seta o valor digitado no input do SLA
   */

  const handleChangeSLA = useCallback(
    ({ target }) => {
      setSla(parseInt(target.value, 10));
      if (parseInt(target.value, 10)) {
        setErrors((prevState) => ({
          ...prevState,
          sla: false,
        }));
      }
    },
    [sla],
  );

  /**
   * @function handleAddSLA
   * @description Aumenta em 1 o valor do SLA
   */

  const handleAddSLA = useCallback(() => {
    setSla(sla + 1);
    if (errors.sla) {
      setSla(0);
      setErrors((prevState) => ({
        ...prevState,
        sla: false,
      }));
    }
  }, [sla, errors.sla]);

  /**
   * @function handleSubtractSLA
   * @description Diminui em 1 o valor do SLA
   */

  const handleSubtractSLA = useCallback(() => {
    if (sla > 0) {
      setSla(sla - 1);
    }
    if (errors.sla) {
      setSla(0);
      setErrors((prevState) => ({
        ...prevState,
        sla: false,
      }));
    }
  }, [sla, errors.sla]);

  /**
   * @function handleChangeCategory
   * @description Seta o valor da categoria selecionada
   */

  const handleChangeCategory = useCallback(
    (name) => {
      setCategory(name.toLowerCase());
    },
    [category],
  );

  /**
   * @function handleChangeDescription
   * @description Seta o valor da categoria selecionada
   */
  const handleChangeDescription = useCallback(
    ({ target }) => {
      setDescription(target.value);
      if (description.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          description: false,
        }));
      }
    },
    [description],
  );

  /**
   * @function handleChangeCategory
   * @description Seta o valor da categoria selecionada
   */

  const handleCloseModalAfterCreating = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [notification]);

  const handleAlertNotCompleteCreatingUser = useCallback(() => {
    if (notCompleteCreating) {
      setError(true);
      setNotification(true);
      setMessage(ERROR_CREATE);
    }
  }, [notCompleteCreating]);

  /**
   * @function handleGetAllStatus
   * @description Bate na api, retorna todos os grupos e usuarios
   * e salva no redux
   */

  const handleGetAllStatus = useCallback(async () => {
    try {
      await dispatch.Status.loadStatusByProductAsync(currentProductById);
    } catch (er) {
      // eslint-disable-next-line no-console
      console.error(er);
    }
  }, [currentProductById]);

  const handleSubmitNewStatus = useCallback(async () => {
    try {
      setLoading(true);
      setErrors(INITIAL_ERRORS);

      if (statusName.length < 3) {
        setErrors((prevState) => ({
          ...prevState,
          statusName: true,
        }));
        return;
      }
      if (parseInt(product, 10) === 0) {
        setErrors((prevState) => ({
          ...prevState,
          product: true,
        }));
        return;
      }

      if (description.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          description: true,
        }));
        return;
      }

      if (Number.isNaN(sla)) {
        setErrors((prevState) => ({
          ...prevState,
          sla: true,
        }));
        return;
      }

      if (backgroundColor === colorText) {
        setErrors((prevState) => ({
          ...prevState,
          colors: true,
        }));

        setLoading(false);
        setNotCompleteCreating(false);
        return;
      }
      const styles = {
        backgroundColor,
        color: colorText,
      };

      const data = {
        id: statusId,
        is_primary: false,
        all_access: true,
        accessGroups: [],
        sendNotification: false,
        category: category.toLowerCase(),
        product_id: parseInt(product, 10),
        name: statusName,
        sla,
        styles,
        description,
        template_id: '',
      };

      await dispatch.Status.updateStatusAsync(data);
      handleGetAllStatus();
      setNotCompleteCreating(false);
      setNotification(true);
      setError(false);
      resetPage(0);
      resetFilter('');
      setMessage(SUCCESS_CREATE);
      handleCloseModalAfterCreating();
    } catch (erro) {
      setNotCompleteCreating(true);
      setError(true);

      setLoading(false);
      setNotCompleteCreating(false);
      setMessage(ERROR_CREATE);
    } finally {
      setLoading(false);
    }
  }, [
    statusName,
    description,
    category,
    sla,
    backgroundColor,
    colorText,
    product,
  ]);

  const handleChangeNotification = useCallback(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  }, [notification]);

  useEffect(() => {
    handleChangeNotification();
  }, [notification]);

  useEffect(() => {
    handleAlertNotCompleteCreatingUser();
  }, [notCompleteCreating]);

  useEffect(() => {
    handleGetAllStatus();
  }, [currentProductById]);

  useEffect(() => {
    handleChangeStatus();
  }, [status]);

  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose} data-testid="back-icon">
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          <Title>INFORMAÇÕES DO STATUS </Title>
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
        />
      </WrapperInputs>

      {products && (
        <WrapperInputs>
          <Typography fontSize="16px" vertical="5px">
            Área
          </Typography>
          <Select onChange={handleChangeSelectProduct} value={product}>
            <Option value="0">Selecione uma área</Option>

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
            />
            <SelectButton
              name="Valid"
              chanceCategory={handleChangeCategory}
              category={category}
            />
            <SelectButton
              name="Pause"
              chanceCategory={handleChangeCategory}
              category={category}
            />
          </SelectWrapper>
          <SelectWrapper>
            <SelectButton
              name="Invalid"
              chanceCategory={handleChangeCategory}
              category={category}
            />
            <SelectButton
              name="Final"
              chanceCategory={handleChangeCategory}
              category={category}
            />
          </SelectWrapper>
        </WrapperInputs>
      </ContentWrapper>
      <FlexContent width="500px" direction="column">
        <Typography fontSize="16px" vertical="15px">
          SLA:
        </Typography>
        <ContainerSLA>
          <LinkButton onClick={handleSubtractSLA}>
            <MinusCircle width="30px" color="#000" />
            {' '}
          </LinkButton>
          <SLA type="number" value={sla} onChange={handleChangeSLA} min="0" />
          <LinkButton onClick={handleAddSLA}>
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
      <PreviewStatus value={backgroundColor}>
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
            value={backgroundColor || colors.details}
          />
        </FlexContent>
        <FlexContent direction="column">
          <Typography fontSize="16px" vertical="5px">
            Cor de texto:
          </Typography>
          <ColorPicker
            type="color"
            onChange={handleChangeTextColorStatus}
            value={colorText || '#ffffff'}
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
        >
          Atualizar status
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

export default UpdateStatusModal;
