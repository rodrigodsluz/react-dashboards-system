/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Image } from './styles';
import useCard from './useUser';
import { dispatch } from '../../Config/store';

const User = ({ name, path, email }) => {
  const { handleFormatName, username } = useCard();
  const [profilePicture, setPorfilePicture] = useState(false);
  const [imgSrc, setImgSrc] = useState(path);

  useEffect(async () => {
    if (path) {
      try {
        await axios({
          url: path,
          method: 'GET',
        });
      } catch (error) {
        await dispatch.User.saveUserAsync(email);
      }
      setPorfilePicture(true);
      setImgSrc(path);
    }
    handleFormatName(name);
  }, [name, path]);
  return (
    <>
      {profilePicture
        ? <Image src={imgSrc} alt={username} />
        : <Container>{username}</Container>}
    </>
  );
};

export default User;
