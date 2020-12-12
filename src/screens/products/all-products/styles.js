import styled from 'styled-components';
import Colors from '../../../utils/color';

export const ProductsWrapper = styled.ScrollView`
  padding: 10px;
`;
export const ProductsCardWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;
export const ProductCard = styled.TouchableOpacity`
  width: 48%;
  margin: 1%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border-color: #cdcdcd;
  border-width: 1px;
`;
export const ProductShare = styled.TouchableOpacity`
  background-color: #fff;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 35px;
  position: absolute;
  top: 5px;
  right: 5px;
  justify-content: center;
  align-items: center;
`;
export const ProductRemove = styled.TouchableOpacity`
  background-color: #fff;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 35px;
  position: absolute;
  top: 45px;
  right: 5px;
  justify-content: center;
  align-items: center;
`;
export const ProductCardBody = styled.View`
  background-color: #fff;
  padding: 10px;
`;
export const ProductTitle = styled.Text``;
export const ProductPriceWrapper = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
export const ProductPrice = styled.Text`
  margin-bottom: 5px;
`;
export const ProductSellPrice = styled.Text`
  color: ${Colors.deleteColor};
  margin-right: 10px;
`;
export const ProductHasSellPrice = styled.Text`
  color: #969696;
  text-decoration-line: line-through;
  font-size: 12px;
`;
export const FeatureImageWrapper = styled.View`
  background-color: #fafafa;
`;

export const ProductStatus = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.status === 'Publish' ? '#43a047a8' : '#b71c1ca3'};
  padding: 4px;
  position: absolute;
  top: 5px;
  left: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
export const ProductStatusText = styled.Text`
  color: #fff;
  font-size: 10px;
`;
