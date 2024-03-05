import * as React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeContainer from './components/Home/HomeContainer';
import DetailsContainer from './components/Details/DetailsContainer';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeContainer} />
      <Stack.Screen name="Details" component={DetailsContainer} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
