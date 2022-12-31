import React from 'react';
import {SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import 'expo-dev-menu';

import Challenge from './src';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from './src/Register';
import Conversation from './src/Conversation';
import Account from './src/Account';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  
  function Welcome() {
  return (
    <Tab.Navigator screenOptions={{tabBarIndicatorStyle: { backgroundColor: '#ff8755', height:5},tabBarActiveTintColor:'#ff8755',tabBarInactiveTintColor:'#808080',tabBarLabelStyle: { fontSize: 17, fontWeight:'700', textTransform: 'none' }}}>
      <Tab.Screen name="Chat" component={Conversation} />
      <Tab.Screen name="Cuenta" component={Account} />
    </Tab.Navigator>
  );
}

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ header:() => <View style={{height:35}}/>}}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const AppContainer = styled.View`
  flex: 1;
  background-color: #ecf0f1;
  align-items: center;
  justify-content: center;
`;
