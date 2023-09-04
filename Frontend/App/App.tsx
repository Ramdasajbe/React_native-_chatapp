import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Chat from './Component/Chat';
import ChatGroups from './Component/ChatGroups';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Component/Login';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChatGroups" component={ChatGroups} />
        <Stack.Screen name="SingalChat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
