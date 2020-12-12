import React from 'react';
import AddCategoryView from './view';
import AppHeader from '../../components/header';

const AddCategoryScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Add Category" navigation={navigation} back />
      <AddCategoryView navigation={navigation} />
    </>
  );
};

export default AddCategoryScreen;
