import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function SentMessageItem({message}) {
  return (
    <View style={styles.messageView}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    marginTop: 16,
    marginEnd: 16,
    backgroundColor: '#0047AB',
    padding: 8,
    alignSelf: 'flex-end',
    maxWidth: '50%',
    borderRadius: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
  },
});
