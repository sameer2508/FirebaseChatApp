import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  icon,
}) {
  return (
    <View style={styles.inputField}>
      {icon}
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal:8,
    alignItems: 'center',
  },
});
