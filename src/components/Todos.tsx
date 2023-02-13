import React, {useEffect, useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {AppBar} from '@react-native-material/core';

import firestore from '@react-native-firebase/firestore';

import ListItem from './ListItem';

const Todos = () => {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([
    {
      id: 'doc.id',
      title: '',
      complete: true,
    },
  ]);

  const ref = firestore().collection('todos');

  async function getToDo() {
    let list: {id: any; title: any; complete: any}[] = [];
    await ref
      .get()
      .then(documests => {
        if (documests.empty) {
          console.log('No data found');
        } else {
          documests.forEach(data => {
            const {title, complete} = data.data();
            list.push({
              id: data.id,
              title,
              complete,
            });
          });
          setTodos(list);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function addTodo() {
    const data = {
      title: todo,
      complete: false,
    };
    await ref
      .add(data)
      .then(() => {
        setTodo('');
        getToDo();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function updateToDo(docId: string, complete: Boolean) {
    const data = {
      complete: !complete,
    };
    await ref
      .doc(docId)
      .update(data)
      .then(() => {
        console.log(docId, ' updated ', complete, ' to ', !complete);
        getToDo();
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    // callFirebase();
    getToDo();
    if (loading) {
      setLoading(false);
    }
  }, []);

  return (
    <View>
      <AppBar title="Todo App" />

      {todos.map(item => (
        <ListItem
          key={item.id}
          listTitle={item.title}
          complete={item.complete}
          onPress={() => {
            updateToDo(item.id, item.complete);
          }}
        />
      ))}

      <View style={{margin: 16}}>
        <TextInput
          placeholder="New Todo"
          value={todo}
          onChangeText={setTodo}
          style={{
            margin: 16,
            borderColor: '#000',
            borderWidth: 1,
            color: '#000',
            padding: 8,
          }}
        />
        <Button onPress={() => addTodo()} title="Add TODO" color="#841584" />
      </View>
    </View>
  );
};

export default Todos;
