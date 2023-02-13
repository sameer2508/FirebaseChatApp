
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {} from '@react-native-material/core';
import InputField from '../../components/InputField';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import firestore from '@react-native-firebase/firestore';

export default function SignUpScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userCollection = firestore().collection('users');

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  function isValidation(name: string, email: string, password: string) {
    if (name == '') {
      showToast('Name required');
      return false;
    }

    if (email == '') {
      showToast('Email required');
      return false;
    }

    if (password == '') {
      showToast('Password required');
      return false;
    }

    return true;
  }

  async function signUp(email: string, password: string) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        saveUserDetails(name, email, user.uid);
      })
      .catch(error => {
        console.error(`signUp: ${error}`);
      });
  }

  async function saveUserDetails(name: string, email: string, id: string) {
    const data = {
      id: id,
      name: name,
      email: email,
    };
    await userCollection
      .doc(id)
      .set(data)
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        showToast('Unable to save user details');
        console.error(`saveUserDetails: ${error}`);
      });
  }

  return (
    <View>
      <View style={styles.centerItem}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>

      <InputField
        label="Name"
        value={name}
        onChangeText={setName}
        keyboardType="default"
        secureTextEntry={false}
        icon={
          <Ionicons
            name="person-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
      />

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
          title="Sign Up"
          onPress={() => {
            if (!isValidation(name, email, password)) {
              return;
            }

            signUp(email, password);
          }}
        />
      </View>

      <View
        style={{
          marginTop: 16,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16}}>Already have an account?</Text>
        <TouchableOpacity
          style={{marginStart: 8}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{fontSize: 16, color: 'blue'}}>Sign In</Text>
        </TouchableOpacity>
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
