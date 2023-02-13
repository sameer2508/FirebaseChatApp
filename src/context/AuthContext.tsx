import React, {createContext, useState, useEffect} from 'react';

import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext('');

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<null | string>(null);

  const showLoadingScreen = () => {
    setIsLoading(true);
  };

  const hideLoadingScreen = () => {
    setIsLoading(false);
  };

  async function getUserId() {
    const id = await auth().currentUser?.uid;
    setUserToken(id);
  }

  const login = () => {
    setIsLoading(true);
    getUserId();
    AsyncStorage.setItem('userToken', JSON.stringify(userToken));
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('authStatus');
    setIsLoading(false);
  };

  async function isLoggedIn() {
    try {
      setIsLoading(true);
      const status = await AsyncStorage.getItem('authStatus');
      if (status !== null) {
        getUserId();
      }
      setIsLoading(false);
    } catch (error) {
      console.error(`isLoggedIn: ${error}`);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
