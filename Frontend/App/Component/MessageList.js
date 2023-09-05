import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MessageList = props => {
  //Message data comes from props
  let messageData = props.message;
  //Flatlist function
  const renderMessage = item => {
    console.log(item)
    return (
      <View key={item.index} style={styles.mainView}>
        {<View style={styles.mainText}>
          <Text style={styles.user}>{item.item.sender.username}</Text>
          <Text style={styles.message}>{item.item.message}</Text>
          <Text style={styles.time}>{moment(item.item.createdAt).format("DD MM YYYY hh:mm:a")}</Text>
        </View>}
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
    flex:1,
    flexDirection:'column',
    color: 'black',
    padding: 10,
    fontSize: 15,
  },
  mainView: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 6,
  },
  user:{
    fontSize:16,
    color:'blue',
    fontWeight:'600'
  },
  message:{

  },
  view:{
    maxHeight:'85%'
  },
  time:{
    alignSelf:'flex-end'
  }
});
