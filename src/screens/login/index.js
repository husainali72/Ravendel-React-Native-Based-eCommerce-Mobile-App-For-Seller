import React, {useState} from 'react';
import LoginForm from './login-form';
import {Alert} from 'react-native';
import AppLoader from '../components/loader';

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [loginDetail, setLoginDetail] = useState({
    password: '',
    email: '',
  });

  const handleValueChange = (name, value) => {
    setLoginDetail({...loginDetail, [name]: value});
  };

  const showAletMessage = (message) => {
    Alert.alert(message, '', [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ]);
  };

  const onSubmit = async () => {
    setLoading(true);
    console.log(loginDetail,'loginDetail')
    if (loginDetail.email === '' || loginDetail.password === '') {
      showAletMessage('All field are required');
    } else {
      navigation.navigate('Confirm', {
        loginDetail: loginDetail,
      });
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <AppLoader /> : null}
      <LoginForm
        loginDetail={loginDetail}
        loading={loading}
        handleChange={(name, value) => handleValueChange(name, value)}
        onSubmit={onSubmit}
        navigation={navigation}
      />
    </>
  );
};

export default LoginScreen;
