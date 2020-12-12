import React from 'react';
import AppHeader from '../components/header';
import {ScrollView} from 'react-native';
import {
  DashbaordCardWrapper,
  DashbaordCard,
  DashbaordCardValue,
  DashbaordCardTitle,
} from './styles';

const DashboardScreen = ({navigation}) => {
  return (
    <>
      <AppHeader title="Dashboard" navigation={navigation} />
      <ScrollView>
        <DashbaordCardWrapper>
          <DashbaordCard onPress={() => navigation.navigate('Order')}>
            <DashbaordCardTitle>Latest Orders</DashbaordCardTitle>
            <DashbaordCardValue>2</DashbaordCardValue>
          </DashbaordCard>
          <DashbaordCard>
            <DashbaordCardTitle>Total Income</DashbaordCardTitle>
            <DashbaordCardValue>$100000</DashbaordCardValue>
          </DashbaordCard>
          <DashbaordCard onPress={() => navigation.navigate('AllProducts')}>
            <DashbaordCardTitle>Total Products</DashbaordCardTitle>
            <DashbaordCardValue>1000</DashbaordCardValue>
          </DashbaordCard>
          <DashbaordCard onPress={() => navigation.navigate('AllCustomers')}>
            <DashbaordCardTitle>Total Customers</DashbaordCardTitle>
            <DashbaordCardValue>100</DashbaordCardValue>
          </DashbaordCard>
          <DashbaordCard
            onPress={() =>
              navigation.navigate('ProductsScreen', {
                screen: 'AddProduct',
                initial: false,
              })
            }>
            <DashbaordCardTitle>Add new product</DashbaordCardTitle>
          </DashbaordCard>
        </DashbaordCardWrapper>
      </ScrollView>
    </>
  );
};

export default DashboardScreen;
