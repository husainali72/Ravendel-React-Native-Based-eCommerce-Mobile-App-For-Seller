import React from 'react';
import styled from 'styled-components';
import {Button} from 'react-native-elements';
import Styles from '../common-styles';

const FormActionsComponent = ({onCancel, onSubmit, submitText}) => (
  <FormAction>
    <Button title="Cancel" buttonStyle={Styles.cancelBtn} onPress={onCancel} />
    <Button
      title={submitText}
      buttonStyle={Styles.submitBtn}
      onPress={onSubmit}
    />
  </FormAction>
);

export default FormActionsComponent;

export const FormAction = styled.View`
  flex-direction: row;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: #ddd;
  margin-top: -10px;
`;
