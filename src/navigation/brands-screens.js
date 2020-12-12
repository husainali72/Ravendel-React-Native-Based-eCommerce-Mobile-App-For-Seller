import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AllBrandsScreen, AddBrandScreen, EditBrandScreen} from '../screens';

const Stack = createStackNavigator();

const BrandsScreens = () => {
  return (
    <Stack.Navigator initialRouteName="AllBrands">
      <Stack.Screen
        name="AllBrands"
        component={AllBrandsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBrand"
        component={EditBrandScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBrand"
        component={AddBrandScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default BrandsScreens;
