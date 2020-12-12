import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AllAttributesScreen,
  AddAttributeScreen,
  EditAttributeScreen,
} from '../screens';

const Stack = createStackNavigator();

const AttrbutesScreen = () => {
  return (
    <Stack.Navigator initialRouteName="AllAttributes">
      <Stack.Screen
        name="AllAttributes"
        component={AllAttributesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditAttribute"
        component={EditAttributeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAttribute"
        component={AddAttributeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AttrbutesScreen;
