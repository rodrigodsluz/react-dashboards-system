import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../Config/store';

const useNewStatus = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );

  const [statusName, setStatusName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [colorBg, setColorBg] = useState('#000000');
  const [colorText, setColorText] = useState('#ffffff');
  const [category, setCategory] = useState('');

  const [sla, setSla] = useState(0);

  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notCompleteCreating, setNotCompleteCreating] = useState(false);
  const INITIAL_ERRORS = {
    description: false,
    product: false,
    category: false,
    statusName: false,
    sla: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const ERROR_STATUS_NAME = 'O nome do status não pode estar vazio.';
  const ERROR_PRODUCT = 'Por favor, selecione uma área para continuar.';
  const ERROR_DESCRIPTION = 'Para melhorar sua experiência futuramente, preencha a descrição do status.';
  const ERROR_SLA = 'SLA é um valor em horas e por isso precisa ser maior ou igual a zero.';
  const ERROR_CREATE = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';
  const ERROR_COLORS = 'Hmmm! Não é possivel selecionar as duas cores iguais!';
  const ERROR_API = 'Algo de errado aconteceu e não foi possivel encontrar os dados.';
  const SUCCESS_CREATE = 'Tudo pronto! Seu usuário foi criado com sucesso.';

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
   * @function handleChangeBackgroundColorStatus
   * @description Seta a cor de fundo na preview do status
   */
  const handleChangeBackgroundColorStatus = useCallback(
    ({ target }) => {
      setColorBg(target.value);
      if (target.value !== colorText) {
        setErrors((prevState) => ({
          ...prevState,
          colors: false,
        }));
      }
    },
    [colorBg, colorText],
  );

  /**
   * @function handleChangeTextColorStatus
   * @description Seta a cor do fundo do status do preview
   */
  const handleChangeTextColorStatus = useCallback(
    ({ target }) => {
      setColorText(target.value);
      if (target.value !== colorBg) {
        setErrors((prevState) => ({
          ...prevState,
          colors: false,
        }));
      }
    },
    [colorText, colorBg],
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
      setError(true);
      setNotification(true);
      setMessage(ERROR_API);
    }
  }, [currentProductById, notification, error]);

  const handleSubmitNewStatus = useCallback(async () => {
    try {
      setLoading(true);

      setErrors(INITIAL_ERRORS);

      if (statusName.length < 3) {
        setErrors((prevState) => ({
          ...prevState,
          statusName: true,
        }));
      }

      if (description.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          description: true,
        }));
      }
      if (Number.isNaN(sla)) {
        setErrors((prevState) => ({
          ...prevState,
          sla: true,
        }));
      }

      if (colorBg === colorText) {
        setErrors((prevState) => ({
          ...prevState,
          colors: true,
        }));

        setLoading(false);
        setNotCompleteCreating(false);
        return;
      }

      const styles = {
        backgroundColor: colorBg,
        color: colorText,
      };

      const data = {
        is_primary: false,
        all_access: true,
        accessGroups: [],
        sendNotification: false,
        category: category.toLowerCase(),
        product_id: currentProductById,
        name: statusName,
        sla,
        styles,
        description,
        template_id: '',
      };

      await dispatch.Status.incrementAsync(data);
      await dispatch.Status.loadStatusByProductAsync(currentProductById);
      handleGetAllStatus();
      setNotCompleteCreating(false);
      setNotification(true);
      setError(false);
      setMessage(SUCCESS_CREATE);
      setSuccess(true);
    } catch (erro) {
      setNotCompleteCreating(true);
      setError(true);
      setMessage(ERROR_CREATE);

      setLoading(false);
      setNotCompleteCreating(false);
    }
  }, [
    statusName,
    description,
    category,
    sla,
    colorBg,
    colorText,
    currentProductById,
    success,
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

  return {
    statusName,
    errors,
    category,
    sla,
    description,
    colorBg,
    colorText,
    loading,
    message,
    notification,
    handleChangeStatusName,
    handleChangeCategory,
    handleChangeDescription,
    handleSubtractSLA,
    handleAddSLA,
    handleChangeBackgroundColorStatus,
    handleChangeTextColorStatus,
    handleSubmitNewStatus,
    handleChangeNotification,
    handleChangeSLA,
    ERROR_PRODUCT,
    ERROR_STATUS_NAME,
    ERROR_DESCRIPTION,
    ERROR_COLORS,
    ERROR_SLA,
    handleGetAllStatus,
    error,
    success,
  };
};

export default useNewStatus;
