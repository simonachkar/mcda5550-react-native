import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

export interface ImageRecord {
  id: number;
  imageSrc: string;
}

export interface Database {
  execAsync: (sql: string, params?: any[]) => Promise<any>;
}

async function initDatabase(): Promise<Database> {
  const db = SQLite.openDatabase('images.db');
  
  try {
    await new Promise<void>((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS images (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              imageSrc TEXT NOT NULL
            );`
          );
        },
        reject,
        () => resolve()
      );
    });
    
    return {
      execAsync: async (sql: string, params: any[] = []) => {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              sql,
              params,
              (_, result) => resolve(result),
              (_, error) => {
                reject(error);
                return false;
              }
            );
          });
        });
      }
    };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

function getWebDatabase(): Database {
  return {
    execAsync: async () => ({ rows: [] })
  };
}

export const getDatabaseInstance = async (): Promise<Database> => {
  if (Platform.OS === 'web') {
    return getWebDatabase();
  }
  return await initDatabase();
}; 