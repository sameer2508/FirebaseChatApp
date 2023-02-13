import React, {useEffect, useState, useContext} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import LoadingScreen from '../../components/LoadingScreen';
import FriendsListItem from '../../components/FriendsListItem';

import {AuthContext} from '../../context/AuthContext';

export default function HomeScreen({navigation}) {
  const [userList, setUserList] = useState([
    {
      id: '',
      name: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const {userToken} = useContext(AuthContext);

  const userCollection = firestore().collection('users');

  async function getListOfUser() {
    await userCollection
      .where('id', '!=', userToken)
      .onSnapshot(querySnapshot => {
        const list: {id: string; name: string}[] = [];
        querySnapshot.forEach(doc => {
          const {id, name} = doc.data();
          list.push({
            id,
            name,
          });
        });
        setUserList(list);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getListOfUser();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {userList.map(item => (
        <FriendsListItem
          key={item.id}
          name={item.name}
          onPress={() => {
           navigation.navigate('Messages',{
            data:item
           })
          }}
        />
      ))}
    </SafeAreaView>
  );
}
