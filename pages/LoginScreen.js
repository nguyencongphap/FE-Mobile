/* eslint-disable */

import React, {useState} from 'react';
import styles, {Button, StyleSheet, SafeAreaView, Text, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {login} from '../backend/idm';
import axios from 'axios';


const LoginScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const submitLogin = async (email, password) => {

        console.log(email);
        console.log(password);
        console.log(password.split(''));

        const payLoad = {
            email: email,
            password: password.split('')
        }

        return await login(payLoad)
            .then(response => {
                console.log("Inside then: " + JSON.stringify(response.data, null, 2))
                if (response.data.result == 1020) {
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                console.error(error);
                console.log(error.response);
            })
    }

    const loginPost = async (email, password) => {
        return await fetch('http://10.0.2.2:8081/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json() )
            .then((json) => {
                console.log(json);
                // if (json.data.result == 1020) {
                //     setAccessToken(json.data.accessToken);
                //     setRefreshToken(json.data.refreshToken);
                //     setIsLoggedIn(true);
                // }
                return json;
            })
            .catch(error => {
                console.error(error);
            })
    }

  return (
    <SafeAreaView style={backgroundStyle}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email."
        onChangeText={email => setEmail(email)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Password."
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />

        <Button
            onPress= {
                async () => {
                   const result = await loginPost(email, password);
                   if (result.result.code == 1020) {
                       navigation.navigate("Search",
                           {accessToken: result.accessToken, refreshToken: result.refreshToken});
                   } else {
                       alert("Please register first");
                   }
                }
            }

            title="LOGIN"
        />
        <Text >Don't have an account? Sign up</Text>

        <Text
            style={{color: 'blue'}}
            onPress={() => navigation.navigate("Register")}>
            here
        </Text>
    </SafeAreaView>

  );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//
// });

export default LoginScreen;
