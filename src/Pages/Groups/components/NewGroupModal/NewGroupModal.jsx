/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
  UserInfo,
} from '@d1.cx/components';
import { ArrowLeft, TrashAlt } from '@d1.cx/icons';
import { useSelector, shallowEqual } from 'react-redux';

import { Chip } from '@material-ui/core';
import SnackAlert from '../../../../components/SnackAlert';
import { dispatch } from '../../../../Config/store';
import {
  Container,
  WrapperInputs,
  Option,
  Header,
  Click,
  ContainerButton,
  WrapperProducts,
  GridChips,
  Row,
  Select,
} from './styles';

function NewGroupModal({ onClose }) {
  const userInfo = useSelector((state) => state.User.user, shallowEqual);
  const allStatusByProducts = useSelector(
    (state) => state.Status.statusPerProduct,
  );

  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState([]);
  const [productsByUser, setProductsByUser] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedStatusByProducts, setSelectedStatusByProducts] = useState([]);
  const [statusName, setStatusName] = useState([]);
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const INITIAL_ERRORS = {
    description: false,
    name: false,
    accessStatus: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const ERROR_PRODUCT = 'Hmmmm! Parace que essa área já foi adicionado.';
  const ERROR_UPDATE_GROUP = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';
  const SUCCESS_CREATE = 'Tudo pronto! Seu grupo foi criado com sucesso.';
  const ERROR_EMPYT = 'Opa! Esse campo não pode estar vazio. Por favor, preencha para que possamos continuar.';
  /**
   * @function handleGetProductsByUser
   * @description Recebe as permissões do usuário
   */

  const handleGetProductsByUser = useCallback(() => {
    if (userInfo) {
      const { capabilities } = userInfo;
      setProductsByUser(capabilities.permittedProducts);
    }
  }, [userInfo]);

  /**
   * @function handleChangeProductName
   * @description Recebe o valor digitado no input de área do grupo
   */

  const handleChangeProductName = useCallback(
    ({ target }) => {
      setProductName(target.value);
    },
    [productName],
  );

  /**
   * @function handleChangeGroupName
   * @description Seta o nome digitado para o grupo
   */

  const handleChangeGroupName = useCallback(
    ({ target }) => {
      setGroupName(target.value);
      setErrors((prevState) => ({
        ...prevState,
        name: false,
      }));
    },
    [groupName],
  );

  /**
   * @function handleChangeDescription
   * @description Seta a descrição digitada
   */

  const handleChangeDescription = useCallback(
    ({ target }) => {
      setDescription(target.value);
      setErrors((prevState) => ({
        ...prevState,
        description: false,
      }));
    },
    [description],
  );

  /**
   * @function handleAddProductsInArray
   * @description Verifica se existe a área e adiciona no array
   */

  const handleAddProductsInArray = useCallback(() => {
    const existingProducts = selectedProducts.map((elem) => elem.product.name);
    const isValid = productsByUser.filter(
      (elem) => elem.name === productName && !existingProducts.includes(productName),
    );
    if (isValid.length > 0) {
      const product = {
        name: productName,
        id: isValid[0].id,
      };
      setSelectedProducts([...selectedProducts, { product }]);
      setProductName('');
    } else {
      setNotification(true);
      setError(true);
      setMessage(ERROR_PRODUCT);
    }
  }, [productName, selectedProducts]);

  /**
   * @function handleChangeStatusBySelectedProduct
   * @description Monta um objeto com as informações da área
   * e salva dentro do array de status
   */

  const handleChangeStatusBySelectedProduct = useCallback(
    (event, index, name) => {
      event?.preventDefault();
      const newItem = {
        name: event.target.value,
        product_id: index,
        product_name: name,
      };
      setStatusName((prev) => ({
        ...prev,
        [index]: newItem,
      }));
    },
    [statusName],
  );

  /**
   * @function handleAddStatusInArray
   * @description Adiciona o novo status dentro do array
   */

  const handleAddStatusInArray = useCallback(() => {
    const status = Object.values(statusName);
    if (status.length > 0) {
      const filterExistingStatus = allStatusByProducts[
        status[0]?.product_name
      ]?.filter((elem) => elem.name === status[0]?.name);

      if (filterExistingStatus?.length > 0) {
        const filterExistingStatusInSelectedProducts = selectedStatusByProducts.filter(
          (elem) => elem?.status.name === status[0]?.name
              && elem?.status.product_id === status[0]?.product_id,
        );

        if (filterExistingStatusInSelectedProducts?.length > 0) {
          setStatusName([]);
        } else {
          setSelectedStatusByProducts([
            ...selectedStatusByProducts,
            { status: status[0] },
          ]);
          setStatusName([]);
        }
      }
    }
  }, [statusName, selectedStatusByProducts]);

  /**
   * @function handleDelete
   * @description Deleta o grupo selecionado pelo index
   */

  const handleDelete = useCallback(
    (index) => {
      const copyItem = [...selectedStatusByProducts];
      copyItem.splice(index, 1);
      setSelectedStatusByProducts(copyItem);
    },
    [selectedStatusByProducts],
  );

  /**
   * @function handleDeleteProduct
   * @description Remove a área pelo index
   * e todos os status por ele recebidos.
   */

  const handleDeleteProduct = useCallback(
    (index, product_id) => {
      const copyItem = [...selectedProducts];
      copyItem.splice(index, 1);
      setSelectedProducts(copyItem);

      const removeStatus = selectedStatusByProducts.filter(
        (elem) => elem.status.product_id !== product_id,
      );

      setSelectedStatusByProducts(removeStatus);
    },
    [selectedProducts, selectedStatusByProducts],
  );

  const handleChangeNotification = useCallback(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  }, [notification]);

  /**
   * @function handleCloseModalAfterCreating
   * @description Fecha o modal depois de 1 segundo, apenas para ser visivel
   * a notificação.
   */

  const handleCloseModalAfterCreating = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [notification]);

  /**
   * @function handleSubmitCreateGroup
   * @description Trata as informações de áreas que estiverem vazias
   * e atualiza o grupo
   */

  const handleSubmitCreateGroup = useCallback(async () => {
    try {
      setLoading(true);
      setErrors(INITIAL_ERRORS);
      const formatRequest = selectedStatusByProducts.map((elem) => {
        const obj = {
          name: elem?.status.name,
          product_id: elem.status.product_id,
        };
        return obj;
      });

      const getProductNames = productsByUser.map((elem) => elem.name);
      const accessStatus = productsByUser.reduce((acc, product) => {
        acc[product.name] = [];
        formatRequest.forEach((status) => {
          if (product.id === status.product_id) {
            acc[product.name].push(status.name);
          }
        });
        return acc;
      }, {});

      getProductNames.forEach((elem) => {
        if (accessStatus[elem].length === 0) {
          delete accessStatus[elem];
        }
      });

      if (groupName.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          name: true,
        }));

        setLoading(false);
      }

      if (description.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          description: true,
        }));
        setLoading(false);
      }

      const payload = {
        accessStatus,
        description,
        name: groupName,
      };

      await dispatch.Groups.createGroupAsync(payload);
      await dispatch.Groups.loadAllGroupsAsync();
      setError(false);
      setMessage(SUCCESS_CREATE);
      handleCloseModalAfterCreating();
      setNotification(true);
      setProductName([]);
      setSelectedProducts([]);
      setSelectedStatusByProducts([]);
    } catch (e) {
      setError(true);
      setMessage(ERROR_UPDATE_GROUP);
      setLoading(false);
    }
  }, [
    groupName,
    description,
    selectedStatusByProducts,
    selectedProducts,
    productsByUser,
  ]);

  useEffect(() => {
    handleGetProductsByUser();
  }, [UserInfo]);

  useEffect(() => {
    if (productName.length > 3) {
      handleAddProductsInArray();
    }
  }, [productName]);

  useEffect(() => {
    handleAddStatusInArray();
  }, [statusName]);

  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose} data-testid="back-icon">
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          NOVO GRUPO
          {' '}
        </Typography>
      </Header>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Nome do grupo:
        </Typography>
        <Input
          placeholder="Nome do grupo"
          value={groupName}
          onChange={handleChangeGroupName}
          error={errors.name}
          errorMessage={ERROR_EMPYT}
          data-testid="txtNome"
        />
      </WrapperInputs>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Descrição:
        </Typography>
        <textarea
          placeholder="Escreva brevemente sobre o grupo"
          value={description}
          onChange={handleChangeDescription}
          required
          data-testid="txtDescricao"
        />
        {errors.description && (
          <Typography color="#f27457" fontSize="12px" vertical="4px">
            {ERROR_EMPYT}
          </Typography>
        )}
      </WrapperInputs>
      <Spacing vertical="5px" />
      <WrapperProducts>
        <Typography fontSize="16px" vertical="5px">
          Atribuição de acessos:
        </Typography>

        {productsByUser && (
          <WrapperInputs>
            <Select
              onChange={handleChangeProductName}
              value={productName}
              disabled={productsByUser.length === 0}
              data-testid="dropdownProdutoGrupo"
            >
              <Option value="0">Selecione uma área</Option>

              {productsByUser
                && productsByUser?.map((elem) => (
                  <Option value={elem.name}>{elem.name}</Option>
                ))}
            </Select>
          </WrapperInputs>
        )}

        <Spacing vertical="10px" />
        {selectedProducts
          && selectedProducts.map(({ product }, i) => (
            <>
              <Row>
                <Typography fontSize="16px" vertical="10px" bold>
                  {product.name}
                </Typography>
                <LinkButton onClick={() => handleDeleteProduct(i, product.id)}>
                  <TrashAlt width="30px" color="red" />
                </LinkButton>
              </Row>

              <Select
                onChange={(event) => handleChangeStatusBySelectedProduct(
                  event,
                  product.id,
                  product.name,
                )}
                value={statusName[product.name]}
              >
                <Option value="0">Selecione um status</Option>

                {allStatusByProducts
                  && allStatusByProducts[product.name]?.map((elem) => (
                    <Option value={elem.name}>{elem.name}</Option>
                  ))}
              </Select>

              <GridChips>
                {selectedStatusByProducts.length > 0 ? (
                  selectedStatusByProducts?.map((elem, index) => {
                    if (elem?.status.product_id === product.id) {
                      return (
                        <Chip
                          label={elem?.status.name.substring(0, 30)}
                          color="primary"
                          variant="outlined"
                          onDelete={() => {
                            handleDelete(index);
                          }}
                        />
                      );
                    }
                    return '';
                  })
                ) : (
                  <FlexContent center>
                    <Typography fontSize="12px">
                      Não foi adicionado nenhum status a essa área
                    </Typography>
                  </FlexContent>
                )}
              </GridChips>
            </>
          ))}
      </WrapperProducts>
      <Spacing vertical="10px" />
      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitCreateGroup}
          loading={loading}
          disabled={loading}
          data-testid="btnSalvar"
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

export default NewGroupModal;
