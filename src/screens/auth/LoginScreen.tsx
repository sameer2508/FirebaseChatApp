import {
  View,
  Text,
  Button,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import {} from '@react-native-material/core';
import InputField from '../../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  async function signIn(emailId: string, password: string) {
    await auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        showToast('Sign In successfully');
      })
      .catch(error => {
        console.error(error);
        showToast('Sign In failed');
      });
  }

  return (
    <View>
      <View style={styles.centerItem}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <InputField
        label="Email Id"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        secureTextEntry={false}
        icon={
          <MaterialIcon
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        secureTextEntry={true}
        icon={
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
      />

      <View style={styles.signInButton}>
        <Button
          title="Sign In"
          onPress={() => {
            signIn(email, password);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerItem: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
  },
  signInButton: {
    marginTop: 24,
    marginHorizontal: 16,
  },
});
