import AsyncStorage from '@react-native-async-storage/async-storage';
let STORAGE_KEY = '@user_input';
export const addUserToLocalStorage = async token => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(token));
    // alert('Data successfully saved');
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};
export const getUserFromLocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    alert(value);
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};
