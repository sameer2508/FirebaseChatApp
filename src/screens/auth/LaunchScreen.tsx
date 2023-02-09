import {View, Text, Button, SafeAreaView} from 'react-native';
import React from 'react';

export default function LaunchScreen({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Text style={{fontSize: 24, fontWeight: '500'}}>
        Your Otp has been verified successully.
      </Text>
      <View style={{marginTop: 16}}>
        <Button
          title="Login Screen"
          onPress={() => {
            navigation.navigate('PhoneNumber');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
