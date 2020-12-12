import React from 'react';
import AppHeader from '../components/header';
import SettingView from './view';

const SettingScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Settings" navigation={navigation} />
      <SettingView />
    </>
  );
};

export default SettingScreen;
