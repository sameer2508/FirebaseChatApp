import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputField from '../../../components/InputField';

import auth from '@react-native-firebase/auth';

export default function PhoneLoginScreen({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('9934298121');

  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation: ' + confirmation);
    if (confirmation != null) {
      navigation.navigate('VerifyOtp', {
        confirmation: confirmation,
      });
    } else {
      console.error('Send otp failed');
    }
  }

  return (
    <View>
      <View style={styles.centerItem}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <InputField
        label="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
        secureTextEntry={false}
        icon={
          <FontAwesome
            name="phone"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        }
      />

      <View style={styles.signInButton}>
        <Button
          title="Send Otp"
          onPress={() => {
            signInWithPhoneNumber(`+91 ${mobileNumber}`);
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
