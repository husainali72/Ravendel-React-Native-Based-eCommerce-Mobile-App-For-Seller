import React from 'react';
import {
  AllCategoriesWrapper,
  CategoryWrapper,
  CategoryName,
  CategoryAction,
  CategoryEditBtn,
  CategoryDeleteAction,
  ErrorText,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/color';
import {Query} from 'react-apollo';
import AppLoader from '../../components/loader';
import {GET_BRANDS, DELETE_BRAND} from '../../../queries/brandsQueries';
import {useMutation} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
import MainContainer from '../../components/mainContainer';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';

const AllBrandsView = ({navigation}) => {
  const isFocused = useIsFocused();

  return (
    <MainContainer>
      <AllCategoriesWrapper>
        <Query query={GET_BRANDS}>
          {({loading, error, data, refetch}) => {
            const [deleteBrands, {loading: deleteLoading}] = useMutation(
              DELETE_BRAND,
              {
                onError: (error) => {
                  GraphqlError(error);
                },
                onCompleted: (data) => {
                  GraphqlSuccess('Deleted successfully');
                  refetch();
                },
              },
            );

            if (isFocused) {
              refetch();
            }
            if (loading) {
              return <AppLoader />;
            }
            if (error) {
              GraphqlError(error);
              return (
                <ErrorText>
                  Something went wrong. Please try again later
                </ErrorText>
              );
            }

            var brands = data.brands;
            return (
              <>
                {deleteLoading ? <AppLoader /> : null}
                {brands.length ? (
                  brands
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((brand, i) => (
                      <CategoryWrapper key={i}>
                        <CategoryName>{brand.name}</CategoryName>
                        <CategoryAction>
                          <CategoryEditBtn
                            onPress={() => {
                              navigation.navigate('BrandsScreens', {
                                screen: 'EditBrand',
                                params: {singleBrand: brand},
                              });
                            }}>
                            <Icon name="pencil" size={15} color="#000" />
                          </CategoryEditBtn>
                          <CategoryDeleteAction
                            onPress={() => {
                              Alert.alert(
                                'Are you sure?',
                                '',
                                [
                                  {
                                    text: 'Cancel',
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'OK',
                                    onPress: () =>
                                      deleteBrands({variables: {id: brand.id}}),
                                  },
                                ],
                                {cancelable: false},
                              );
                            }}>
                            <Icon
                              name="trash"
                              size={15}
                              color={Colors.deleteColor}
                            />
                          </CategoryDeleteAction>
                        </CategoryAction>
                      </CategoryWrapper>
                    ))
                ) : (
                  <ErrorText>No Data</ErrorText>
                )}
              </>
            );
          }}
        </Query>
      </AllCategoriesWrapper>
    </MainContainer>
  );
};

export default AllBrandsView;
