import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

import firestore from '@react-native-firebase/firestore';
import SentMessageItem from '../../components/SentMessageItem';
import ReceiveMessageItem from '../../components/ReceiveMessageItem';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MessagesScreen({navigation, route}) {
  const {userToken} = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const friendUserId = route.params?.data.id;
  const [messageList, setMessageList] = useState([
    {
      message: '',
      category: '',
      messageId: '',
      sentOn: 0,
      sentBy: '',
    },
  ]);
  const scrollViewRef: any = useRef();

  async function sendMessage(message: string) {
    const senderMessageId = generateMessageId(userToken, friendUserId);

    if (senderMessageId == '') {
      console.error("Message can't be sent as id null");
      return;
    }

    const data = {
      message: message,
      category: 'text',
      messageId: senderMessageId,
      sentOn: Date.now(),
      sentBy: userToken,
    };

    const messageCollection = firestore().collection('messages');

    messageCollection
      .doc()
      .set(data)
      .then(() => {
        console.log(`senderId: ${userToken} receiverId: ${friendUserId} sent`);
        setMessage('');
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function getListOfMessages() {
    const senderMessageId = generateMessageId(userToken, friendUserId);
    const receiverMesageId = generateMessageId(friendUserId, userToken);

    const messageCollection = firestore().collection('messages');

    messageCollection
      .where('messageId', 'in', [senderMessageId, receiverMesageId])
      .onSnapshot(querySnapshot => {
        const list: {
          message: string;
          category: string;
          messageId: string;
          sentOn: number;
          sentBy: string;
        }[] = [];
        querySnapshot.forEach(doc => {
          const {message, category, messageId, sentOn, sentBy} = doc.data();
          list.push({
            message: message,
            category: category,
            messageId: messageId,
            sentOn: sentOn,
            sentBy: sentBy,
          });
        });
        list.sort(function (a, b) {
          return a.sentOn - b.sentOn;
        });
        setMessageList(list);
      });
  }

  const generateMessageId = (senderId: string, receiverId: string) => {
    if (senderId == '' || receiverId == '') {
      console.error("User id can't be null");
      return '';
    }

    return `${senderId}_to_${receiverId}`;
  };

  useEffect(() => {
    getListOfMessages();
  }, []);

  return (
    <SafeAreaView style={{flex: 2}}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {messageList.map(item =>
          userToken === item.sentBy ? (
            <SentMessageItem key={item.sentOn} message={item.message} />
          ) : (
            <ReceiveMessageItem key={item.sentOn} message={item.message} />
          ),
        )}
      </ScrollView>

      <View
        style={{
          margin: 16,
          marginHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <TextInput
          style={styles.textInput}
          placeholder="Send Message"
          value={message}
          onChangeText={setMessage}
          keyboardType="default"
          multiline={true}
        />
        <View
          style={{
            marginTop: 8,
            width: '10%',
            marginEnd: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {message.length !== 0 ? (
            <TouchableOpacity
              onPress={() => {
                sendMessage(message);
              }}>
              <Ionicons name="send" size={40} color="blue" />
            </TouchableOpacity>
          ) : (
            <View style={{opacity: 0.3}}>
              <Ionicons name="send" size={40} color="blue" />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'blue',
    width: '80%',
    padding: 8,
    fontSize: 16,
  },
  sendLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
