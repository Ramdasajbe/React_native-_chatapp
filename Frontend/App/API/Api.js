import axios from 'axios';
import {getUserFromLocalStorage} from '../Component/AsyncStorage';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//const user = AsyncStorage.getItem(STORAGE_KEY);
const api = axios.create({
  baseURL: 'http://192.168.137.1:5000',
  // headers: {
  //   Authorization: `Bearer ${user}`,
  // },
});

// api.interceptors.request.use(async config => {
//   let STORAGE_KEY = '@user_input';
//   const user = await AsyncStorage.getItem(STORAGE_KEY);
//   console.log('user--->', user);

//   if (user) {
//     config.headers.common['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export default api;
