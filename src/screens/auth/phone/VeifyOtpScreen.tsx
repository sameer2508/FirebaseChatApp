import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../../components/InputField';

export default function VeifyOtpScreen({navigation, route}) {
  const [otp, setOtp] = useState('');

  async function VerifyOtp(otp: string) {
    console.log(`otp: ${otp}`);
    try {
      await route.params?.confirmation.confirm(otp);
      navigation.navigate('LaunchScreen');
    } catch (error) {
      console.error(`verifyOtp: ${error}`);
    }
  }

  return (
    <View>
      <View style={styles.centerItem}>
        <Text style={styles.heading}>Verify Otp</Text>
      </View>

      <InputField
        label="Mobile Number"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        secureTextEntry={false}
      />

      <View style={styles.signInButton}>
        <Button
          title="Verify"
          onPress={() => {
            VerifyOtp(otp);
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
