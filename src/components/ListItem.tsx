import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ListItem = ({listTitle, complete, onPress}) => {
  return (
    <View
      style={{
        margin: 8,
        padding: 8,
        borderColor: 'blue',
        borderWidth: 0.5,
      }}>
      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Text>{listTitle}</Text>
          <Text style={{marginStart: 16}}>{String(complete)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
