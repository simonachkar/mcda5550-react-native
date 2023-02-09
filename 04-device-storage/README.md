# Storing Data on the device in React Native using SQLite

> 📱 Todo App with Database

React Native provides many ways to store data locally on the device, one of them is by using SQLite. SQLite is a popular, lightweight, and open-source relational database management system.

There are many libraries used in React Native to store data on the device  with SQLite. In this lecture we are using `expo-sqlite`.

[Expo SQLite Docs](https://docs.expo.dev/versions/latest/sdk/sqlite/)

Keep in mind that `expo-sqlite` does not work on web.

## Usage 

- "Open" the database by defining a const `db` and calling `SQLite.openDatabase('database_name.db')`
- Now you can access `db` and specifically the `db.transaction` to to execute SQL commands
- Create table in case it does not exist inside a `useEffect` hook

### `tx.executeSql`

The first argument of `tx.executeSql` is the SQL command. 

The second argument is an optional array of values to be bound to the placeholders in the SQL statement.

The third argument is a callback function that receives the results of the SQL command. The results are stored in the `rows` object. The `rows` object has a property `_array` that contains an array of all the rows returned by the SQL command.

### INSERT

## Example

```js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('test.db');

function Component() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Create table `test` (if does not exist)
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);'
      );
    });

    // Select all data from table `test`
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM test', [], (_, { rows }) => {
        setData(rows._array);
      });
    });
  }, []);

  function insertData() {
    // Insert data into `test`
    db.transaction(tx => {
      tx.executeSql('INSERT INTO test (value) VALUES (?)', [value]);
    });
    setValue('');
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Insert Data" onPress={insertData} />
      {data.map(item => (
        <View key={item.id}>
          <Text>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

export default Component;
```

In the example above, we first open a database connection using `SQLite.openDatabase`. 

Then, we use the `db.transaction` method to execute SQL commands. The `db.transaction` method takes a callback function that executes the SQL commands. 

In this example, we first create a table `test` **if it doesn't exist**, and then we select all data from the table and display it on the screen. 

To insert data into the database, we use the `db.transaction` method again with an `INSERT` command.
