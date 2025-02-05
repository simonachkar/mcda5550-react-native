import { getDatabaseInstance } from "./db";

export interface ImageRecord {
    id: number;
    imageSrc: string;
}

export async function getImages(): Promise<ImageRecord[]> {
    try {
        const db = await getDatabaseInstance();

        if ('getAllAsync' in db) {
            const result = await db.getAllAsync<ImageRecord>('SELECT * FROM images');
            return result ?? [];
        }
        return [];
    } catch (error) {
      console.error('Error getting images:', error);
      throw error;
    }
}

export async function saveImage(uri: string) {
    try {
        const db = await getDatabaseInstance();

        if ('getAllAsync' in db) {
            const result = await db.getAllAsync<ImageRecord>('INSERT INTO images (imageSrc) VALUES (?)', uri);
        }
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  }