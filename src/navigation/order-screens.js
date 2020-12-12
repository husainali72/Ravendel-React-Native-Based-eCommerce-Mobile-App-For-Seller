import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AllOrdersScreen, ViewOrderScreen} from '../screens';

const Stack = createStackNavigator();

const OrdersScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen
        name="Order"
        component={AllOrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewOrder"
        component={ViewOrderScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default OrdersScreen;
