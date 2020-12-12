import styled from 'styled-components';
import Colors from '../../../utils/color';

export const AddWrapper = styled.View`
  flex: 1;
`;
export const TopBar = styled.View`
  padding: 5px 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #ddd;
  margin-top: -10px;
`;
export const AddFormWrapper = styled.ScrollView`
  padding: 10px;
  flex: 1;
`;
export const AddFormSections = styled.View`
  padding: 10px;
  background-color: #fff;
  margin-top: 7px;
  margin-bottom: 7px;
`;
export const AddFormSectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.primaryColor};
  margin-bottom: 10px;
`;
export const CheckBoxWrapper = styled.View`
  background-color: #fff;
  flex-direction: row;
`;
export const UploadModalWrapper = styled.View`
  background-color: #fff;
  padding: 25px 10px;
`;
