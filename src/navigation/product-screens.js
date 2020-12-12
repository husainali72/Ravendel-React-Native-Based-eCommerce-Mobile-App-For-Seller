import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AllProductsScreen,
  AddProductsScreen,
  EditProductsScreen,
} from '../screens';

const Stack = createStackNavigator();

const ProductsScreen = () => {
  return (
    <Stack.Navigator initialRouteName="AllProduct">
      <Stack.Screen
        name="AllProduct"
        component={AllProductsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default ProductsScreen;
