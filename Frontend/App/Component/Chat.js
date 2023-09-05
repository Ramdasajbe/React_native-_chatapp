import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageList from './MessageList';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Chat = ({navigation, route}) => {
  let socket, selectedChatCompare;
  socket = io('http://192.168.29.244:5000');
  let selectedChat = route.params.data;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      let STORAGE_KEY = '@user_input';
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      let Config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(user).token}`,
        },
      };
      console.log(
        'recive',
        JSON.parse(user).token,
        'selectedChat._id',
        selectedChat._id,
      );
      const {data} = await axios.get(
        `http://192.168.29.244:5000/api/v1/message/${selectedChat._id}`,
        Config,
      );

      setMessages(data);
      setLoading(false);
      socket.emit('join-chat', selectedChat._id);
    } catch (error) {
      alert(error);
    }
  };

  const sendMessage = async e => {
    if (newMessage) {
      socket.emit('stop-typing', selectedChat._id);
      try {
        let STORAGE_KEY = '@user_input';
        const user = await AsyncStorage.getItem(STORAGE_KEY);
        let Config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(user).token}`,
          },
        };

        const {data} = await axios.post(
          `http://192.168.29.244:5000/api/v1/message/`,
          {
            message: newMessage,
            chatId: selectedChat._id,
          },
          Config,
        );

        setNewMessage('');
        socket.emit('new-message', data);
        setMessages([...messages, data]);
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(async () => {
    let STORAGE_KEY = '@user_input';
    const user = await AsyncStorage.getItem(STORAGE_KEY);
    // socket = io('http://192.168.29.244:5000');
    socket.emit('setup', JSON.parse(user));

    socket.on('connected', () => setSocketConnected(true));

    socket.on('typing', () => setIsTyping(true));
    socket.on('stop-typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  // useEffect(() => {
  //   grtMessages();
  // });

  socket.on('message-received', async newMessageReceived => {
    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageReceived.chat._id
    ) {
      // notification
      if (!notification.includes(newMessageReceived)) {
        setNotification([newMessageReceived, ...notification]);
        setFetchAgain(!fetchAgain);
      }
    } else {
      setMessages([...messages, newMessageReceived]);
    }
  });

  const typingHandler = e => {
    setNewMessage(e);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop-typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <View>
      <View style={styles.mainView}>
        {loading ? (
          <View>
            <Text>Loading.....</Text>
          </View>
        ) : (
          <View style={{height: '80%'}}>
            <MessageList message={messages} />
          </View>
        )}
        <TouchableOpacity>
          {isTyping ? (
            <View>
              <Text>Typing ...</Text>
            </View>
          ) : (
            <></>
          )}
          <TextInput
            style={{height: '20%'}}
            variant="filled"
            bg="#E0E0E0"
            placeholder="Enter a message.."
            value={newMessage}
            onChangeText={e => typingHandler(e)}
          />
          <Text
            onPress={() => {
              sendMessage();
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainView: {
    padding: windowWidth / 16,
  },
});
