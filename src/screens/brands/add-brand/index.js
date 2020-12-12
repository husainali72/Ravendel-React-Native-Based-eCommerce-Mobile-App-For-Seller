import React from 'react';
import AddBrandView from './view';
import AppHeader from '../../components/header';

const AddBrandScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Add Brand" navigation={navigation} back />
      <AddBrandView navigation={navigation} />
    </>
  );
};

export default AddBrandScreen;
