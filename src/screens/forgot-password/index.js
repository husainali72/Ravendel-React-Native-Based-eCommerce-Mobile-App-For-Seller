import React, {useState} from 'react';
import {Alert} from 'react-native';
import ForgotForm from "./forgot-form"

const ForgotPasswordScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');

    const handleValueChange = (value) => {
        setEmail(value)
    }

    const onSubmit = async () => {
        setLoading(true);
        
        if(email === ''){
            Alert.alert(
                "Field is required",
                "",
                [
                    {
                    text: "Ok",
                    style: "cancel"
                    },
                ],
                );
        }else{
           navigation.goBack();
        }
        setLoading(false);
        
    }

    return (
        <ForgotForm
            email={email}
            loading={loading}
            handleChange={(value) => handleValueChange(value)}
            onSubmit={onSubmit}
            navigation={navigation}
        />
    )
}

export default ForgotPasswordScreen;