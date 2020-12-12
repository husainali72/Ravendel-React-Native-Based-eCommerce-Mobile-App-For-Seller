import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ViewCustomerScreen, AllCustomerScreen} from '../screens';

const Stack = createStackNavigator();

const CustomersScreen = () => {
  return (
    <Stack.Navigator initialRouteName="AllCustomers">
      <Stack.Screen
        name="AllCustomers"
        component={AllCustomerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewCustomer"
        component={ViewCustomerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default CustomersScreen;
