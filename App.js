/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/* eslint-disable */
import React, {useState} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import SearchScreen from './pages/SearchScreen';
import {Text, View} from 'react-native';
import MovieDetailScreen from './pages/MovieDetailScreen';

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'Fablix'}}
          />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />

            <Stack.Screen
                name="Search"
                component={SearchScreen}
            />

            <Stack.Screen
                name="MovieDetail"
                component={MovieDetailScreen}
            />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

