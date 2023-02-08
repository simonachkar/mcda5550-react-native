import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Todo App</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
      // onChangeText={onChangeTextHandler}
      // value={todo}
    />
    </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 10, 
  },
  title: {
    fontSize: 32,
    paddingTop: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 6,
    width: '100%',
    padding: 16,
    margin: 16,
  },
});
