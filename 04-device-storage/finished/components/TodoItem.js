import { StyleSheet, View, Text, Pressable } from 'react-native';

import Colors from '../constants/colors';

const TodoItem = ({ onDeleteItem, id, text }) => {
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

export default TodoItem;

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