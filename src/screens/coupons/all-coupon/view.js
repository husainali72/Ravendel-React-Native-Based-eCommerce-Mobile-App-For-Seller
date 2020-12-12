import React from 'react';
import {Alert, Text} from 'react-native';
import {
  CouponCardWrapper,
  CouponCard,
  CouponCardTitle,
  CouponCardFooter,
  CouponCardBody,
  ValidUntil,
  CouponCardFooterAction,
  CouponCardFooterActionBtn,
  CouponCode,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeColor from '../../../utils/color';
import {Query} from 'react-apollo';
import {GET_COUPONS} from '../../../queries/couponQueries';
import AppLoader from '../../components/loader';
import {useIsFocused} from '@react-navigation/native';
import {DELETE_COUPON} from '../../../queries/couponQueries';
import {useMutation} from '@apollo/client';
import MainContainer from '../../components/mainContainer';
import {GraphqlError, GraphqlSuccess} from '../../components/garphqlMessages';
import moment from 'moment';

const AllCouponsView = ({navigation}) => {
  const isFocused = useIsFocused();

  return (
    <MainContainer>
      <CouponCardWrapper>
        <Query query={GET_COUPONS}>
          {({loading, error, data, refetch}) => {
            const [deleteCoupon, {loading: deleteLoading}] = useMutation(
              DELETE_COUPON,
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

            var coupons = data.coupons;
            return (
              <>
                {deleteLoading ? <AppLoader /> : null}
                {coupons.length
                  ? coupons.map((coupon, i) => (
                      <CouponCard key={i}>
                        <CouponCardBody
                          Expired={
                            moment(coupon.expire).format('l') <
                            moment(new Date()).format('l')
                          }>
                          <CouponCode>{coupon.code}</CouponCode>
                          <CouponCardTitle>
                            {coupon.discount_type === 'precantage-discount'
                              ? `${coupon.discount_value}%`
                              : null}
                            {coupon.discount_type === 'amount-discount'
                              ? `$${coupon.discount_value}`
                              : null}{' '}
                            off
                          </CouponCardTitle>
                        </CouponCardBody>
                        <CouponCardFooter
                          Expired={
                            moment(coupon.expire).format('l') <
                            moment(new Date()).format('l')
                          }>
                          <ValidUntil
                            Expired={
                              moment(coupon.expire).format('l') <
                              moment(new Date()).format('l')
                            }>
                            {moment(coupon.expire).format('l') <
                            moment(new Date()).format('l')
                              ? `Expired: ${moment(coupon.expire).format('LL')}`
                              : `Valid until: ${moment(coupon.expire).format(
                                  'LL',
                                )}`}
                          </ValidUntil>
                          <CouponCardFooterAction>
                            <CouponCardFooterActionBtn
                              onPress={() => {
                                navigation.navigate('CouponScreen', {
                                  screen: 'EditCoupon',
                                  params: {singleCoupon: coupon},
                                });
                              }}>
                              <Icon name="pencil" size={15} color="#000" />
                            </CouponCardFooterActionBtn>
                            <CouponCardFooterActionBtn
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
                                        deleteCoupon({
                                          variables: {id: coupon.id},
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
                            </CouponCardFooterActionBtn>
                          </CouponCardFooterAction>
                        </CouponCardFooter>
                      </CouponCard>
                    ))
                  : null}
              </>
            );
          }}
        </Query>
      </CouponCardWrapper>
    </MainContainer>
  );
};

export default AllCouponsView;
