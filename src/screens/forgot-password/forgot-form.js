import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import { Input, Button } from 'react-native-elements';
import {ForgotWrapper, ForgotTitle} from './styles';

const ForgotForm = ({email, loading, handleChange, onSubmit}) => {
    return (
        <ForgotWrapper>
            <KeyboardAvoidingView
                behavior="padding"
                enabled
            >
                <ScrollView>
                    <ForgotTitle>Forgot Password</ForgotTitle>
                    <Input
                        label='Email'
                        value={email}
                        onChangeText={value => handleChange(value)}
                    />

                    <Button
                        title="SEND"
                        loading={loading}
                        onPress={onSubmit}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </ForgotWrapper>
    )
}

export default ForgotForm;