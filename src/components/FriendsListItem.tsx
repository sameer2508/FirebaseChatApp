import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function FriendsListItem({name, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 8,
          padding: 16,
          borderWidth: 2,
          borderColor: '#808080',
          marginTop: 16,
          marginHorizontal: 16,
        }}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
