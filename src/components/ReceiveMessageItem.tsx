import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ReceiveMessageItem({message}) {
  return (
    <View style={styles.messageView}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    marginTop: 16,
    marginStart: 16,
    backgroundColor: '#8F9779',
    padding: 8,
    alignSelf: 'baseline',
    maxWidth: '50%',
    borderRadius: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
});
