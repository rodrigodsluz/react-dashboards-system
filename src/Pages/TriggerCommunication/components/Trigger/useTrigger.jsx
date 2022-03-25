/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  createConnection,
  testConnection,
  deleteById,
  updateById,
} from '../../../../Config/Api/Connections';
import useChangeText from '../../../../hooks/useChanceText';
import { dispatch } from '../../../../Config/store';

const ERROR = ' Ops! Alguma coisa de errada aconteceu. Tente novamente!';
const SUCCESS = 'Tudo certo! Sua connection foi criada com sucesso.';
const UPDATE = 'Pronto! Sua connection foi atualizada com sucesso.';
const DELETE = 'Pronto! Sua connection foi removida com sucesso.';
const TEST = 'Tudo certo! Seu teste foi enviado com sucesso';
const useTrigger = () => {
  const uniqueTemplate = useSelector(
    (state) => state.Connection.uniqueConnection,
  );
  const userPermissions = useSelector((state) => state.User.user);
  const [name, handleChangeName, setName] = useChangeText();
  const [clientID, handleChangeClientID, setClientID] = useChangeText();
  const [clientSecret, handleChangeClientSecret, setClientSecret] = useChangeText();
  const [endPoint, handleChangeEndPoint, setEndPoint] = useChangeText();
  const [platform, handleChangePlataform, setPlatform] = useChangeText();
  const [tenentId, handleChangeTenentId, setTenentId] = useChangeText();
  const [jouneyEmail, handleChangeJourneyEmail, setJourneyEmail] = useChangeText();
  const [journeySms, handleChangeJourneySms, setJourneySms] = useChangeText();
  const [selectedTemplateId, setSelectedTemplateId] = useState('0');
  const [phone, handleChangePhone, setPhone] = useChangeText();
  const [message, setMessage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isActive, setIsActive] = useState('Email');

  const [errors, setErrors] = useState({
    name: false,
    clientID: false,
    clientSecret: false,
    endPoint: false,
    platform: false,
    tenentId: false,
    journeyEmail: false,
    journeySms: false,
  });

  const resetInputs = () => {
    setName('');
    setPlatform('');
    setClientID('');
    setClientSecret('');
    setEndPoint('');
    setJourneyEmail('');
    setJourneySms('');
    setTenentId('');
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [openModal]);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [openModal]);

  const handleLoadAll = async () => {
    try {
      await dispatch.Connection.loadAll();
    } catch (error) {
      setErrorAPI(true);
    }
  };

  const handleActive = useCallback(
    (type) => {
      setIsActive(type);
    },
    [isActive],
  );

  const handleSelectedTemplate = useCallback(
    async ({ target }) => {
      setSelectedTemplateId(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setIsEditing(true);
        setLoading(true);
        const data = { id: parseInt(target.value, 10) };
        try {
          await dispatch.Connection.loadById(data);
          setErrorAPI(false);
          setMessage(SUCCESS);
        } catch (error) {
          setErrorAPI(true);
          setMessage(ERROR);
          setOpenNotification(true);
        } finally {
          setLoading(false);
        }
      } else {
        setIsEditing(false);
        resetInputs();
      }
    },
    [selectedTemplateId],
  );

  const handleSetValuesInInputWithSelectedTemplate = useCallback(() => {
    if (uniqueTemplate && selectedTemplateId !== '0') {
      const {
        client_name,
        platform: platform_name,
        settings: {
          clientId,
          clientSecret: secret_client,
          journeyIdEmail,
          journeyIdSms,
          tenantId,
          endpoint,
        },
      } = uniqueTemplate;
      setName(client_name);
      setPlatform(platform_name);
      setClientID(clientId);
      setClientSecret(secret_client);
      setEndPoint(endpoint);
      setJourneyEmail(journeyIdEmail);
      setJourneySms(journeyIdSms);
      setTenentId(tenantId);
    }
  }, [uniqueTemplate, isEditing]);

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const handleUpdate = async (event) => {
    try {
      event?.preventDefault();
      setLoading(true);
      const payload = {
        id: parseInt(selectedTemplateId, 10),
        client_name: name,
        platform,
        settings: {
          clientId: clientID,
          clientSecret,
          endpoint: endPoint,
          flag: true,
          tenantId: tenentId,
          journeyIdEmail: jouneyEmail,
          journeyIdSms: journeySms,
        },
      };
      await updateById(payload);
      await handleLoadAll();
      setMessage(UPDATE);
      setErrorAPI(false);
      setSelectedTemplateId('0');
      resetInputs();
      setIsEditing(false);
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR);
    } finally {
      setOpenNotification(true);
      setLoading(false);
    }
  };

  const handleCheckEmptyFields = () => {
    if (name.length === 0) {
      setErrors((prev) => ({
        ...prev,
        name: true,
      }));
    }

    if (clientID.length === 0) {
      setErrors((prev) => ({
        ...prev,
        clientID: true,
      }));
    }

    if (clientSecret.length === 0) {
      setErrors((prev) => ({
        ...prev,
        clientSecret: true,
      }));
    }

    if (endPoint.length === 0) {
      setErrors((prev) => ({
        ...prev,
        endPoint: true,
      }));
    }

    if (platform.length === 0) {
      setErrors((prev) => ({
        ...prev,
        platform: true,
      }));
    }
    if (tenentId.length === 0) {
      setErrors((prev) => ({
        ...prev,
        tenentId: true,
      }));
    }

    if (jouneyEmail.length === 0) {
      setErrors((prev) => ({
        ...prev,
        jouneyEmail: true,
      }));
    }

    if (journeySms.length === 0) {
      setErrors((prev) => ({
        ...prev,
        journeySms: true,
      }));
    }
  };

  const handleSubmit = async (event) => {
    try {
      event?.preventDefault();
      setLoading(true);
      handleCheckEmptyFields();
      const payload = {
        client_name: name,
        platform,
        settings: {
          clientId: clientID,
          clientSecret,
          endpoint: endPoint,
          flag: true,
          tenantId: tenentId,
          journeyIdEmail: jouneyEmail,
          journeyIdSms: journeySms,
        },
      };
      await createConnection(payload);
      await handleLoadAll();
      setMessage(SUCCESS);
      setErrorAPI(false);
      resetInputs();
      setSelectedTemplateId('0');
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR);
    } finally {
      setOpenNotification(true);
      setLoading(false);
    }
  };

  const handleTestTrigger = async (event) => {
    try {
      event?.preventDefault();
      setLoading(true);

      const payload = {
        email: userPermissions?.email,
        sms: phone,
        client_name: name,
        platform,
        settings: {
          clientId: clientID,
          clientSecret,
          endpoint: endPoint,
          flag: true,
          tenantId: tenentId,
          journeyIdEmail: isActive === 'Email' ? jouneyEmail : '',
          journeyIdSms: isActive === 'SMS' ? journeySms : '',
        },
      };
      await testConnection(payload);
      setMessage(TEST);
      setErrorAPI(false);
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR);
    } finally {
      setOpenNotification(true);
      setLoading(false);
    }
  };

  const handleDeleteTemplate = useCallback(async () => {
    try {
      setLoading(true);
      await deleteById({ id: parseInt(selectedTemplateId, 10) });
      setMessage(DELETE);
      setErrorAPI(false);
      resetInputs();
      setSelectedTemplateId('0');
      handleLoadAll();
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR);
    } finally {
      setOpenNotification(true);
      setLoading(false);
    }
  }, [selectedTemplateId]);

  useEffect(() => {
    if (name.length > 0) {
      setErrors((prev) => ({
        ...prev,
        name: false,
      }));
    }

    if (clientID.length > 0) {
      setErrors((prev) => ({
        ...prev,
        clientID: false,
      }));
    }

    if (clientSecret.length > 0) {
      setErrors((prev) => ({
        ...prev,
        clientSecret: false,
      }));
    }

    if (endPoint.length > 0) {
      setErrors((prev) => ({
        ...prev,
        endPoint: false,
      }));
    }

    if (platform.length > 0) {
      setErrors((prev) => ({
        ...prev,
        platform: false,
      }));
    }

    if (tenentId.length > 0) {
      setErrors((prev) => ({
        ...prev,
        tenentId: false,
      }));
    }

    if (jouneyEmail.length > 0) {
      setErrors((prev) => ({
        ...prev,
        jouneyEmail: false,
      }));
    }

    if (journeySms.length > 0) {
      setErrors((prev) => ({
        ...prev,
        journeySms: false,
      }));
    }
  }, [
    name,
    clientID,
    clientSecret,
    endPoint,
    platform,
    tenentId,
    jouneyEmail,
    journeySms,
  ]);

  useEffect(() => {
    handleLoadAll();
  }, []);

  useEffect(() => {
    if (selectedTemplateId === '0') {
      resetInputs();
    }
  }, [selectedTemplateId]);

  useEffect(() => {
    handleSetValuesInInputWithSelectedTemplate();
  }, [uniqueTemplate]);

  return {
    name,
    clientID,
    clientSecret,
    platform,
    endPoint,
    isEditing,
    errorAPI,
    jouneyEmail,
    tenentId,
    journeySms,
    openModal,
    phone,
    selectedTemplateId,
    handleChangeName,
    handleChangeClientID,
    handleChangeClientSecret,
    handleChangeEndPoint,
    handleCheckEmptyFields,
    handleChangePlataform,
    handleChangeTenentId,
    handleChangeJourneyEmail,
    handleChangeJourneySms,
    handleChangePhone,
    handleUpdate,
    handleSubmit,
    openNotification,
    handleCloseNotification,
    handleSelectedTemplate,
    handleCloseModal,
    handleDeleteTemplate,
    handleOpenModal,
    errors,
    loading,
    message,
    handleTestTrigger,
    handleActive,
    isActive,
  };
};

export default useTrigger;
