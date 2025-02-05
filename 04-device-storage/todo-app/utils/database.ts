import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

async function initDatabase() {
  // Use openDatabaseSync instead of openDatabaseAsync
  const db = SQLite.openDatabaseSync('todos.db');
  
  try {
    // Execute the table creation in a transaction
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
      );
    `);
    
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
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