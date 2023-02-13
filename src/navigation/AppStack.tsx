import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import MessagesScreen from '../screens/home/MessagesScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={({route}) => ({
          title: route.params?.data.name,
        })}
      />
    </Stack.Navigator>
  );
}
