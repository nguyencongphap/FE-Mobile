/* eslint-disable */

import React, {useState} from 'react';
import styles, {Button, StyleSheet, SafeAreaView, Text, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {login, register} from '../backend/idm';



const RegisterScreen = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitRegister = async (email, password) => {

        console.log(email);
        console.log(password);
        console.log(password.split(''));

        const payLoad = {
            email: email,
            password: password.split('')
        }

         return await register(payLoad)
            .then(response => {
                console.log("Inside then: " + JSON.stringify(response.data, null, 2));
                return response;
            })
            .catch(error => {
                console.error(error);
                console.log(error.response);
            })
        ;
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
                        const response = await submitRegister(email, password);
                        console.log(response.data);
                        if (response.data.result.code == 1010) {
                            navigation.navigate("Login");
                        } else {
                            alert("Error in registering");
                        }
                    }
                }

                title="Register"
            />
            <Text >Don't have an account? Sign up</Text>


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

export default RegisterScreen;
