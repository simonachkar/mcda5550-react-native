import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";

import TodoItem from "./components/TodoItem";
import TodoInputModal from "./components/TodoInputModal";

import Colors from "./constants/colors";

function getDatabase() {
  // Error handling, in case the platform is web (expo-sqlite does not support web)
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
  // console.log(db);
  return db;
}

const db = getDatabase();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    // Create table `items` (if does not exist)
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, text TEXT);",
        (message) => console.log(message) // callback
      );
    });

    // Select all data from table `todos`
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM todos;`, [], (_, { rows: { _array } }) =>
        setTodos(_array)
      );
    });
  }, []);

  const addTodo = (todoText) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { text: todoText, id: Math.random().toString() },
    ]);

    // Add `todoText` to database
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO todos (text) VALUES (?)", [todoText]);
    });

    setModalIsVisible(false);
  };

  const removeTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });

    // Remove `todoText` with that specific `id` from database
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM ITEMS WHERE id = ?;`, [id]);
    });
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <Button
          title="+ Add Todo"
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
