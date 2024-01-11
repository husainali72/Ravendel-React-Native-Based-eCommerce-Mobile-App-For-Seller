import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from "@rneui/themed";
import {
  LoginWrapper,
  LoginTitle,
  ForgotPasswordBtn,
  ForgotPasswordText,
} from './styles';

const LoginForm = ({
  loginDetail,
  loading,
  handleChange,
  onSubmit,
  navigation,
}) => {
  return (
    <LoginWrapper>
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <LoginTitle>Login</LoginTitle>
          <Input
            label="Email"
            value={loginDetail.email}
            leftIcon={<Icon name="user" size={24} color="black" />}
            onChangeText={(value) => handleChange('email', value)}
          />

          <Input
            label="Password"
            value={loginDetail.password}
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            onChangeText={(value) => handleChange('password', value)}
          />

          <Button title="LOGIN" loading={loading} onPress={onSubmit} />

          <ForgotPasswordBtn
            onPress={() => navigation.navigate('ForgotPassword')}>
            <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
          </ForgotPasswordBtn>
        </ScrollView>
      </KeyboardAvoidingView>
    </LoginWrapper>
  );
};

export default LoginForm;
