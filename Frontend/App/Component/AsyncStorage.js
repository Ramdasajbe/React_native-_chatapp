import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
let STORAGE_KEY = '@user_input';
export const addUserToLocalStorage = async token => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(token));
    Alert.alert('Data successfully saved',JSON.stringify(token));
  } catch (e) {
    Alert.alert('Failed to save the data to the storage',e);
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

export const RemoveUserFromLocalStorage = () => {
  try{
    AsyncStorage.removeItem(STORAGE_KEY)
    Alert.alert("Removing the User")
  }catch(e){
    Alert.alert('Failed to Remove the user');
  }
}
 