import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreen';
import ScheduleMatch from '../screens/scheduleMatch';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScheduleMatch" component={ScheduleMatch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;