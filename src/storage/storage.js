import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@MatchSchedule';

export const saveMatchSchedule = async (date, startTime, endTime) => {
  try {
    const existingSchedule = await AsyncStorage.getItem(STORAGE_KEY);
    let schedule = existingSchedule ? JSON.parse(existingSchedule) : [];

    schedule.push({ date, startTime, endTime });

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    return true;
  } catch (error) {
    console.error('Error saving match schedule:', error);
    return false;
  }
};

export const getMatchSchedule = async () => {
  try {
    const existingSchedule = await AsyncStorage.getItem(STORAGE_KEY);
    return existingSchedule ? JSON.parse(existingSchedule) : [];
  } catch (error) {
    console.error('Error getting match schedule:', error);
    return [];
  }
};

export const clearMatchSchedule = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing match schedule:', error);
    return false;
  }
};
