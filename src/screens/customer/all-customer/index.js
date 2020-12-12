import React from 'react';
import AppHeader from '../../components/header';
import AllCustomerView from './view';

const AllCustomerScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Customers" navigation={navigation} />
      <AllCustomerView navigation={navigation} />
    </>
  );
};

export default AllCustomerScreen;
