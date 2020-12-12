import styled from 'styled-components';
import Colors from '../../../utils/color';

export const EditCouponWrapper = styled.ScrollView`
  padding: 10px;
`;
export const FormWrapper = styled.View`
  padding: 10px;
  background-color: #fff;
`;
export const CouponExpiryBtn = styled.TouchableOpacity`
  padding: 4px 12px;
  border-bottom-width: 1px;
  border-color: #15405059;
`;
export const CouponExpiryText = styled.Text`
  margin-bottom: 5px;
  font-size: 16px;
`;
export const CouponExpiryLabel = styled.Text`
  color: ${Colors.primaryColor};
  opacity: 0.5;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
`;
export const Restricationtitle = styled.Text`
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 25px;
  font-weight: bold;
`;
