import React from 'react';
import {Alert, Text} from 'react-native';
import {
  AttributesWrapper,
  AttrCard,
  AttrName,
  AttrVal,
  AttrActionWrapper,
  AttrActionBtn,
  AttrValTitle,
  AttrValWrapper,
  AttrHeader,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeColor from '../../../utils/color';
import {Query} from 'react-apollo';
import {
  GET_ATTRIBUTES,
  DELETE_ATTRIBUTE,
} from '../../../queries/attributesQueries';
import AppLoader from '../../components/loader';
import {useIsFocused} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import MainContainer from '../../components/mainContainer';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';

const AllAttributesView = ({navigation}) => {
  const isFocused = useIsFocused();

  return (
    <MainContainer>
      <AttributesWrapper>
        <Query query={GET_ATTRIBUTES}>
          {({loading, error, data, refetch}) => {
            const [deleteAttribute, {loading: deleteLoading}] = useMutation(
              DELETE_ATTRIBUTE,
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
              return <Text>Something went wrong. Please try again later</Text>;
            }

            var Attributes = data.product_attributes;
            return (
              <>
                {deleteLoading ? <AppLoader /> : null}
                {Attributes.length
                  ? Attributes.map((attr, i) => (
                      <AttrCard key={i}>
                        <AttrHeader>
                          <AttrName>{attr.name}</AttrName>
                          <AttrActionWrapper>
                            <AttrActionBtn
                              onPress={() => {
                                console.log('id:', attr.id);
                                navigation.navigate('AttrbutesScreen', {
                                  screen: 'EditAttribute',
                                  params: {id: attr.id},
                                });
                              }}>
                              <Icon name="pencil" size={15} color="#000" />
                            </AttrActionBtn>
                            <AttrActionBtn
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
                                        deleteAttribute({
                                          variables: {id: attr.id},
                                        }),
                                    },
                                  ],
                                  {cancelable: false},
                                );
                              }}>
                              <Icon
                                name="trash"
                                size={15}
                                color={ThemeColor.deleteColor}
                              />
                            </AttrActionBtn>
                          </AttrActionWrapper>
                        </AttrHeader>
                        {attr.values && attr.values.length ? (
                          <AttrValWrapper>
                            <AttrValTitle>Values</AttrValTitle>
                            <AttrVal>
                              {attr.values.map((val, i) => val.name).join(', ')}
                            </AttrVal>
                          </AttrValWrapper>
                        ) : null}
                      </AttrCard>
                    ))
                  : null}
              </>
            );
          }}
        </Query>
      </AttributesWrapper>
    </MainContainer>
  );
};

export default AllAttributesView;
