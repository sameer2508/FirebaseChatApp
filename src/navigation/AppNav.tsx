import {View, Text, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';

import {AuthContext} from '../context/AuthContext';

import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import LoadingScreen from '../components/LoadingScreen';

export default function AppNav() {
  const {isLoading, userToken} = useContext(AuthContext);

  if 
  (isLoading) {
    return (
     <LoadingScreen />
    );
  }

  useEffect(() => {
    console.log('useEffect AppNav:', userToken);
  });

  return (
    <NavigationContainer>
      {userToken === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
