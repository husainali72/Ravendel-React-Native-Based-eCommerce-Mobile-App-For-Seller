import React from 'react';
import AppHeader from '../../components/header';
import OrderView from './view';

const ViewOrderScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Orders" navigation={navigation} back />
      <OrderView />
    </>
  );
};

export default ViewOrderScreen;
