/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import useChangeText from '../../../../hooks/useChanceText';

const useFormTrigger = () => {
  const [boxName, handleChangeBoxName, handleSetInputBoxName] = useChangeText();
  const [username, handleChangeUsername, handleSetInputUserName] = useChangeText();
  const [email, handleChangeEmail, handleSetInputEmail] = useChangeText();
  const [password, handleChangePassword, handleSetInputPassword] = useChangeText();

  const [protocol, handleChangeProtocol, handleSetInputProtocol] = useChangeText();
  const [
    incommingEmail,
    handleChangeIncommingEmail,
    handleSetInputIncommingEmail,
  ] = useChangeText();
  const [
    incommingPort,
    handleChangeIncommingPort,
    handleSetInputIncommingPort,
  ] = useChangeText();

  const [
    outgoingEmail,
    handleChangeOutgoingEmail,
    handleSetInputOutgoingEmail,
  ] = useChangeText();
  const [outgoingPort, handleChangeOutgoingPort, handleSetInputOutgoingPort] = useChangeText();
  const [outgoingProtocol, handleOutgoingProtocol] = useChangeText('');

  const [errors, setErrors] = useState({
    boxName: false,
    password: false,
    username: false,
    email: false,
    incommingEmail: false,
    incommingPort: false,
    outgoingEmail: false,
    outgoingPort: false,
  });

  const handleTestTrigger = () => {
    if (boxName.length === 0) {
      setErrors((prev) => ({
        ...prev,
        boxName: true,
      }));
    }
    if (password.length === 0) {
      setErrors((prev) => ({
        ...prev,
        password: true,
      }));
    }
    if (username.length === 0) {
      setErrors((prev) => ({
        ...prev,
        username: true,
      }));
    }
    if (email.length === 0) {
      setErrors((prev) => ({
        ...prev,
        email: true,
      }));
    }

    if (incommingEmail.length === 0) {
      setErrors((prev) => ({
        ...prev,
        incommingEmail: true,
      }));
    }

    if (incommingPort.length === 0) {
      setErrors((prev) => ({
        ...prev,
        incommingPort: true,
      }));
    }

    if (outgoingEmail.length === 0) {
      setErrors((prev) => ({
        ...prev,
        outgoingEmail: true,
      }));
    }

    if (outgoingPort.length === 0) {
      setErrors((prev) => ({
        ...prev,
        outgoingPort: true,
      }));
    }
  };

  useEffect(() => {
    if (boxName.length > 0) {
      setErrors((prev) => ({
        ...prev,
        boxName: false,
      }));
    }
    if (password.length > 0) {
      setErrors((prev) => ({
        ...prev,
        password: false,
      }));
    }
    if (username.length > 0) {
      setErrors((prev) => ({
        ...prev,
        username: false,
      }));
    }
    if (email.length > 0) {
      setErrors((prev) => ({
        ...prev,
        email: false,
      }));
    }

    if (incommingEmail.length > 0) {
      setErrors((prev) => ({
        ...prev,
        incommingEmail: false,
      }));
    }

    if (incommingPort.length > 0) {
      setErrors((prev) => ({
        ...prev,
        incommingPort: false,
      }));
    }

    if (outgoingEmail.length > 0) {
      setErrors((prev) => ({
        ...prev,
        outgoingEmail: false,
      }));
    }

    if (outgoingPort.length > 0) {
      setErrors((prev) => ({
        ...prev,
        outgoingPort: false,
      }));
    }
  }, [
    boxName,
    username,
    password,
    email,
    incommingEmail,
    incommingPort,
    outgoingEmail,
    outgoingPort,
  ]);

  return {
    handleTestTrigger,
    boxName,
    password,
    username,
    email,
    incommingEmail,
    incommingPort,
    outgoingPort,
    outgoingEmail,
    outgoingProtocol,
    errors,
    handleChangeBoxName,
    handleChangeUsername,
    handleChangePassword,
    handleChangeEmail,
    handleChangeIncommingEmail,
    handleChangeIncommingPort,
    handleChangeOutgoingPort,
    handleChangeOutgoingEmail,
    handleOutgoingProtocol,
  };
};

export default useFormTrigger;
