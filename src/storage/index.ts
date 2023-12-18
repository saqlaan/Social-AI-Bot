import AsyncStorage from '@react-native-async-storage/async-storage';

const setLocalData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error!', e);
  }
};

const getLocalData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error!', e);
  }
};

export { getLocalData, setLocalData };
