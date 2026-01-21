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
        <Text style={styles.todoText} numberOfLines={2}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.primary500,
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  pressedItem: {
    opacity: 0.5,
  },
  todoText: {
    color: Colors.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 16,
  },
});
