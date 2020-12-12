import React from 'react';
import AddAttrView from './view';
import AppHeader from '../../components/header';

const AddAttributeScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Add Attribute" navigation={navigation} back />
      <AddAttrView navigation={navigation} />
    </>
  );
};

export default AddAttributeScreen;
