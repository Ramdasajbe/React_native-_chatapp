import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MessageList = props => {
  //Message data comes from props
  let messageData = props.message;
  //Flatlist function
  const renderMessage = item => {
    return (
      <View key={item.index} style={styles.mainView}>
        {<Text style={styles.mainText}>{item.item.message}</Text>}
      </View>
    );
  };
  return (
    <FlatList
      data={messageData}
      renderItem={item => renderMessage(item)}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessageList;

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    padding: 10,
    fontSize: 15,
  },
  mainView: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 6,
  },
});
