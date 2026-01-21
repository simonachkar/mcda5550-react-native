import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TodoInputModalProps } from "../types";
import Colors from "../constants/colors";

export function TodoInputModal({
  isVisible,
  onAddTodo,
  onCancel,
}: TodoInputModalProps) {
  const [enteredText, setEnteredText] = useState("");

  const handleAddTodo = () => {
    if (enteredText.trim().length === 0) return;
    onAddTodo(enteredText);
    setEnteredText("");
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <View style={styles.innerCard}>
          <Image
            style={styles.image}
            source={require("../assets/images/check.png")}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Your next todo!"
            onChangeText={setEnteredText}
            value={enteredText}
            autoFocus={true}
            onSubmitEditing={handleAddTodo}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Cancel"
                onPress={onCancel}
                color={Colors.secondary500}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Add Todo"
                onPress={handleAddTodo}
                color={Colors.primary600}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.primary500,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.primary600,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 6,
    width: "100%",
    padding: 14,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  button: {
    width: 110,
    marginHorizontal: 8,
  },
  innerCard: {
    width: '100%',
    backgroundColor: Colors.primary300,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
});
