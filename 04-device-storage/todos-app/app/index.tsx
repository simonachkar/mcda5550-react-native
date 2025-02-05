import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TodoItem } from "../components/TodoItem";
import { TodoInputModal } from "../components/TodoInputModal";
import { getDatabaseInstance } from "../utils/database";
import Colors from "../constants/colors";
import { Todo } from "../types";
import * as SQLite from "expo-sqlite";

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await getDatabaseInstance();
      if (database && 'transaction' in database) {
        // Cast to unknown first, then to SQLiteDatabase
        const sqliteDb = database as unknown as SQLite.SQLiteDatabase;
        setDb(sqliteDb);
        await loadTodos(sqliteDb);
      }
    };
    initDb();
  }, []);

  const loadTodos = async (database: SQLite.SQLiteDatabase) => {
    try {
      const result = await database.getAllAsync<Todo>("SELECT * FROM todos");
      setTodos(result);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const addTodo = async (todoText: string) => {
    if (!db) return;

    try {
      const result = await db.runAsync("INSERT INTO todos (text) VALUES (?)", [
        todoText,
      ]);

      if (result.lastInsertRowId) {
        const newTodo: Todo = {
          id: result.lastInsertRowId.toString(),
          text: todoText,
        };
        setTodos((currentTodos) => [...currentTodos, newTodo]);
      }
      setModalIsVisible(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTodo = async (id: string) => {
    if (!db) return;

    try {
      await db.runAsync("DELETE FROM todos WHERE id = ?", [id]);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Todos",
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.white,
        }}
      />
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Todo"
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
            renderItem={({ item }) => (
              <TodoItem
                text={item.text}
                id={item.id}
                onDeleteItem={removeTodo}
              />
            )}
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
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  todosContainer: {
    flex: 5,
    marginTop: 14,
  },
});
