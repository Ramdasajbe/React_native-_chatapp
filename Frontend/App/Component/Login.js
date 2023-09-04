import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {addUserToLocalStorage} from './AsyncStorage';
import api from '../API/Api';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setemail] = useState('test3@gmail.com');
  const [password, setpassword] = useState('1234');
  const login = async () => {
    if (!email || !password) {
      alert('Please Fill All the Fields');

      return;
    }
    try {
      const {data} = await api.post('/api/v1/auth/login', {
        email,
        password,
      });

      alert(`Welcome Back! ${data.username}`);
      if (data.username) {
        addUserToLocalStorage(data);

        navigation.navigate('ChatGroups');
      }
    } catch (error) {
      alert(error);
      //alert(error.response.data.msg);
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={e => {
          setemail(e);
        }}
        value={email}
        placeholder="email"
        keyboardType="ascii-capable"
      />
      <TextInput
        style={styles.input}
        onChangeText={e => {
          setpassword(e);
        }}
        value={password}
        placeholder="password"
        keyboardType="ascii-capable"
      />
      <Button
        onPress={login}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
