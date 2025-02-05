import { StyleSheet, View, Text, Pressable } from "react-native";
import { TodoItemProps } from "../types";
import Colors from "../constants/colors";

export function TodoItem({ onDeleteItem, id, text }: TodoItemProps) {
  return (
    <Pressable
      onPress={() => onDeleteItem(id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.todoContainer}>
        <Text style={styles.todoText}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary500,
    padding: 4,
    paddingVertical: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  todoText: {
    color: Colors.white,
    padding: 8,
  },
});
