import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler
} from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { RemoveUserFromLocalStorage } from './AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatGroups = ({ navigation }) => {
  const [Groups, setGroups] = React.useState([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    getChatGroup();
    {
      navigation.setOptions({
        onclick: {},
        headerShown: true,
      })
    }
  }, []);

  const getChatGroup = async () => {
    try {
      let STORAGE_KEY = '@user_input';
      const user = await AsyncStorage.getItem(STORAGE_KEY);

      let Config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(user).token}`,
        },
      };
      const { data } = await axios.get(
        'http://192.168.29.243:5000/api/v1/chat',
        Config,
      );
      setGroups(data);
    } catch (error) { }
  };



  return (
    <View style={{ width: windowWidth, display: 'flex', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SingalChat', { data: Groups[0] });
        }}>
        <Text style={{ fontSize: 30 }}>{Groups[0]?.chatName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatGroups;
