import React from 'react';
import {ListItem} from 'react-native-elements';
import {AllCustomerWrapper} from './styles';
import {useIsFocused} from '@react-navigation/native';
import AppLoader from '../../components/loader';
import {Text} from 'react-native';
import {Query} from 'react-apollo';
import {GET_CUSTOMERS} from '../../../queries/customerQueries';
import Colors from '../../../utils/color';
import MainContainer from '../../components/mainContainer';
import {GraphqlError} from '../../components/garphqlMessages';

const AllCustomerView = ({navigation}) => {
  const isFocused = useIsFocused();
  return (
    <MainContainer>
      <AllCustomerWrapper>
        <Query query={GET_CUSTOMERS}>
          {({loading, error, data, refetch}) => {
            if (isFocused) {
              refetch();
            }
            if (loading) {
              return <AppLoader />;
            }
            if (error) {
              GraphqlError(error);
              return <Text>Something went wrong. Please try again later</Text>;
            }

            var Customers = data.customers;
            return Customers.length > 0
              ? Customers.sort((a, b) =>
                  a.first_name > b.first_name ? 1 : -1,
                ).map((customer, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    onPress={() =>
                      navigation.navigate('CustomersScreen', {
                        screen: 'ViewCustomer',
                        params: {singleCustomer: customer},
                      })
                    }>
                    <ListItem.Content>
                      <ListItem.Title>
                        {customer.first_name + ' ' + customer.last_name}
                      </ListItem.Title>
                      <ListItem.Subtitle>{customer.phone}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron size={22} color={Colors.primaryColor} />
                  </ListItem>
                ))
              : null;
          }}
        </Query>
      </AllCustomerWrapper>
    </MainContainer>
  );
};

export default AllCustomerView;
