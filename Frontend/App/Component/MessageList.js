import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MessageList = props => {
  //Message data comes from props
  let messageData = props.message;
  const [user, Setuser] = useState('');

  useEffect(() => {
    getUserData();
  });

  const getUserData = async () => {
    let STORAGE_KEY = '@user_input';
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    Setuser(JSON.parse(userData));
  };

  //Flatlist function
  const renderMessage = item => {
    return (
      <View style={styles.mainView}>
        {item.item.sender._id !== user._id ? (
          <View key={item.index} style={styles.recevierView}>
            {
              <View style={styles.mainText}>
                <Text style={styles.user}>{item.item.sender.username}</Text>
                <Text style={styles.message}>{item.item.message}</Text>
                <Text style={styles.time}>
                  {moment(item.item.createdAt).format('DD-MM-YYYY hh:mm:a')}
                </Text>
              </View>
            }
          </View>
        ) : (
          <View key={item.index} style={styles.userView}>
            {
              <View style={styles.mainText}>
                <Text style={styles.user}>{item.item.sender.username}</Text>
                <Text style={styles.message}>{item.item.message}</Text>
                <Text style={styles.time}>
                  {moment(item.item.createdAt).format('DD-MM-YYYY hh:mm:a')}
                </Text>
              </View>
            }
          </View>
        )}
      </View>
    );
  };
  return (
    <FlatList
      style={styles.view}
      data={messageData}
      renderItem={item => renderMessage(item)}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessageList;

const styles = StyleSheet.create({
  mainText: {
    flex: 1,
    flexDirection: 'column',
    color: 'black',
    padding: 10,
    fontSize: 15,
  },
  mainView: {
    flex: 1,
    width: '100%',
  },
  recevierView: {
    width: '50%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 6,
  },
  userView: {
    width: '50%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 6,
  },
  user: {
    fontSize: 16,
    color: 'blue',
    fontWeight: '600',
  },
  message: {
    margin: 10,
  },
  view: {
    maxHeight: '88%',
  },
  time: {
    alignSelf: 'flex-end',
  },
});
