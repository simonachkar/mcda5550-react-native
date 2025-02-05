import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

async function initDatabase() {
  const db = await SQLite.openDatabaseAsync('todos.db');
  
  // Create the todos table if it doesn't exist
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    );
  `);
  
  return db;
}

// For web platform (not supported)
function getWebDatabase() {
  return {
    transaction: () => ({
      executeSql: () => {},
    }),
  };
}

export const getDatabaseInstance = async () => {
  if (Platform.OS === 'web') {
    return getWebDatabase();
  }
  return await initDatabase();
};