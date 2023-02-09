import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from "expo-sqlite";

import TodoItem from './components/TodoItem';
import TodoInputModal from './components/TodoInputModal';

import Colors from './constants/colors';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");

  console.log(db);
  return db;
}

const db = openDatabase();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const addTodo = (todoText) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { text: todoText, id: Math.random().toString() },
    ]);
    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (text) values (?)", [todoText]);
        tx.executeSql("select * from items", [], (sqlTransaction, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null
    );
    setModalIsVisible(false);
  }

  const removeTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });

    db.transaction(
      (tx) => {
        tx.executeSql(`delete from items where id = ?;`, [id]);
      },
      null
    )
  }


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, text text);",
        (message) => console.log(message)
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items;`,
        1,
        (_, { rows: { _array } }) => setTodos(_array)
      );
    });
  }, []);

  return (
    <>
      <StatusBar style='dark' />
      <View style={styles.appContainer}>
        <Button
          title='+ Add Todo'
          color={Colors.primary600}
          onPress={() => setModalIsVisible(true)}
        />
        <TodoInputModal
          isVisible={modalIsVisible}
          onAddTodo={addTodo}
          onCancel={() => setModalIsVisible(false)}
        />
        <View style={styles.todosContainer}>
          <FlatList
            data={todos}
            renderItem={(itemData) => {
              return (
                <TodoItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={removeTodo}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
  },
  todosContainer: {
    flex: 5,
    marginTop: 14,
  },
});
