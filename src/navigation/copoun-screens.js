import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AllCouponsScreen,
  EditCouponsScreen,
  AddCouponsScreen,
} from '../screens';

const Stack = createStackNavigator();

const CouponScreens = () => {
  return (
    <Stack.Navigator initialRouteName="AllCoupons">
      <Stack.Screen
        name="AllCoupons"
        component={AllCouponsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditCoupon"
        component={EditCouponsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCoupons"
        component={AddCouponsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default CouponScreens;
