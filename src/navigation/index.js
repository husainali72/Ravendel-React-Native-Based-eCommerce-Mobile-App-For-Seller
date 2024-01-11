import React, {useEffect, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SettingScreen,
  ProfileScreen,
  ForgotPasswordScreen,
  LoginScreen,
  DashboardScreen,
  ConfirmScreen,
} from '../screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomDrawer} from '../screens/components/custom-drawer';
import CustomersScreen from './customer-screens';
import OrdersScreen from './order-screens';
import CouponScreens from './copoun-screens';
import ProductsScreen from './product-screens';
import CategoriesScreens from './category-screens';
import BrandsScreens from './brands-screens';
import AttrbutesScreen from './attributes-screen';
import {Context as AuthContext} from '../context/AuthContext';
import {isEmpty} from '../utils/helper';
// import InternetConnectivity from '../screens/components/internet-connectivity';
import SplashScreen from '../screens/components/splash-screen';
import {setToken} from '../utils/api';

const Drawer = createDrawerNavigator();
const Auth = createStackNavigator();

const Navigation = () => {
  const AuthState = useContext(AuthContext);
  console.log(JSON.stringify(AuthState), 'authstae');
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 500);

  useEffect(() => {
    setToken();
  }, [AuthState.state.login]);

  useEffect(() => {
    if (AuthState && AuthState.state.token === null) {
      AuthState.checkIsLoggedIn();
    }
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          {AuthState &&
          AuthState.state &&
          !isEmpty(AuthState.state.token) &&
          AuthState.state.login ? (
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
                lazy: false,
              }}
              backBehavior={'initialRoute'}
              detachInactiveScreens={true}
              drawerContent={props => <CustomDrawer {...props} />}>
              <Drawer.Screen name="Dashboard" component={DashboardScreen} />
              <Drawer.Screen name="ProductsScreen" component={ProductsScreen} />
              <Drawer.Screen
                name="CategoryScreen"
                component={CategoriesScreens}
              />
              <Drawer.Screen name="BrandsScreens" component={BrandsScreens} />
              <Drawer.Screen
                name="AttrbutesScreen"
                component={AttrbutesScreen}
              />
              <Drawer.Screen name="CouponScreen" component={CouponScreens} />
              <Drawer.Screen
                name="CustomersScreen"
                component={CustomersScreen}
              />
              <Drawer.Screen name="Profile" component={ProfileScreen} />
              <Drawer.Screen name="OrdersScreen" component={OrdersScreen} />
              <Drawer.Screen name="Setting" component={SettingScreen} />
            </Drawer.Navigator>
          ) : (
            <Auth.Navigator initialRouteName="Login">
              <Auth.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Auth.Screen
                name="Confirm"
                component={ConfirmScreen}
                options={{
                  headerTransparent: true,
                  title: '',
                }}
              />
              <Auth.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  headerTransparent: true,
                  title: '',
                }}
              />
            </Auth.Navigator>
          )}
        </>
      )}
      {/* <InternetConnectivity /> */}
    </>
  );
};

export default Navigation;
