/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import SideBar from '../../components/SideBar/SideBar';
import { verifyUser } from '../../Auth';

const PrivateRoute = (props) => {
  const history = useHistory();
  verifyUser(history, '/');

  return (
    <>
      <SideBar />
      <Header />

      <Route {...props} />
    </>
  );
};
export default PrivateRoute;
