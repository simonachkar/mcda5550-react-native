import * as SQLite from "expo-sqlite";

function getDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("images.db");
  return db;
}

const db = getDatabase();

export default db;
