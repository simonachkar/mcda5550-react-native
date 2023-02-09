import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import TodoItem from "./components/TodoItem";
import TodoInputModal from "./components/TodoInputModal";

import Colors from "./constants/colors";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const addTodo = (todoText) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { text: todoText, id: Math.random().toString() },
    ]);
    setModalIsVisible(false);
  };

  const removeTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
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
