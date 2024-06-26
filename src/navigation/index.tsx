import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { UserScopes } from 'types/users';
import { checkConnection } from 'redux/slices/connectionSlice';
import { initCredentials, jwtSignIn } from 'redux/slices/authSlice';
import { VerifyPage } from 'screens/AuthScreens';
import { MascotPage } from 'screens/BaseScreens';
import AuthNavigation from './AuthNavigation';
import BaseNavigation from './BaseNavigation';

const RootNavigation = () => {
  const { isConnected } = useAppSelector((state) => state.connection);
  const { authenticated, user } = useAppSelector((state) => state.auth);
  const { history } = useAppSelector((state) => state.loginhistory);
  const role = user?.role;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkConnection()).finally(() => {});
  }, []);
  useEffect(() => {
    dispatch(initCredentials({})).finally(() => {});
  }, []);

  // When the app loads, try to log in with token stored in async storage
  useEffect(() => {
    if (isConnected) {
      dispatch(jwtSignIn({}));
    }
  }, [isConnected]);


  return (
    <NavigationContainer>
      {!authenticated ? (
        <AuthNavigation />
      ) : role === UserScopes.Unverified ? (
        <VerifyPage />
      ) : (
        <BaseNavigation />
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
