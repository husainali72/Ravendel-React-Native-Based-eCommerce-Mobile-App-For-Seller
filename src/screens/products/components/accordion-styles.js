import Colors from '../../../utils/color';
import styled from 'styled-components';

export const HeaderOpenStyle = {
  paddingBottom: 10,
  borderBottomWidth: 1,
  borderColor: '#ddd',
};

export const AccordionWrapper = styled.View`
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const AccordionHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const AccordionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.primaryColor};
`;
export const AccordionBody = styled.View`
  overflow: hidden;
`;
