import React from 'react';

import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';

export default function LoadingScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{fontSize: 18, marginTop: 8}}>Please wait...</Text>
    </SafeAreaView>
  );
}
