import React from 'react';
import PhoneLoginScreen from './src/screens/auth/PhoneLoginScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VeifyOtpScreen from './src/screens/auth/VeifyOtpScreen';
import LaunchScreen from './src/screens/auth/LaunchScreen';

const PhoneNumberAuthentication = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneNumber" component={PhoneLoginScreen} />
        <Stack.Screen name="VerifyOtp" component={VeifyOtpScreen} />
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () =>{
  return <PhoneNumberAuthentication />
}

export default App;
