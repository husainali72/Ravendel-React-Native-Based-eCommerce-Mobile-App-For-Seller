import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AllCategoriesScreen,
  AddCategoryScreen,
  EditCategoryScreen,
} from '../screens';

const Stack = createStackNavigator();

const CategoriesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="AllCategories">
      <Stack.Screen
        name="AllCategories"
        component={AllCategoriesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default CategoriesScreens;
