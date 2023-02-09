import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../constants/colors';

function TodoItem(props) {
  return (
    <Pressable
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary500,
    padding: 4,
    paddingVertical: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: Colors.white,
    padding: 8,
  },
});