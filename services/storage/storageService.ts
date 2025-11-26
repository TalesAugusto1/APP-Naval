import AsyncStorage from '@react-native-async-storage/async-storage';
import { School } from '@/types/school.types';
import { Class } from '@/types/class.types';

const KEYS = {
  SCHOOLS: '@schools',
  CLASSES: '@classes',
  QUEUE: '@sync_queue',
  LAST_SYNC: '@last_sync',
};

export const storageService = {
  async saveSchools(schools: School[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SCHOOLS, JSON.stringify(schools));
    } catch (error) {
      console.error('Error saving schools:', error);
    }
  },

  async getSchools(): Promise<School[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SCHOOLS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading schools:', error);
      return [];
    }
  },

  async saveClasses(classes: Class[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CLASSES, JSON.stringify(classes));
    } catch (error) {
      console.error('Error saving classes:', error);
    }
  },

  async getClasses(): Promise<Class[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CLASSES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading classes:', error);
      return [];
    }
  },

  async saveQueue(queue: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error('Error saving queue:', error);
    }
  },

  async getQueue(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.QUEUE);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading queue:', error);
      return [];
    }
  },

  async clearQueue(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.QUEUE);
    } catch (error) {
      console.error('Error clearing queue:', error);
    }
  },

  async saveLastSync(timestamp: number): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.LAST_SYNC, timestamp.toString());
    } catch (error) {
      console.error('Error saving last sync time:', error);
    }
  },

  async getLastSync(): Promise<number | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.LAST_SYNC);
      return data ? parseInt(data, 10) : null;
    } catch (error) {
      console.error('Error loading last sync time:', error);
      return null;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([KEYS.SCHOOLS, KEYS.CLASSES, KEYS.QUEUE, KEYS.LAST_SYNC]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },
};
