import React from 'react';
import AppHeader from '../components/header';
import ProfileView from './view';

const ProfileScreen = ({navigation}) => {
    return (
        <>
            <AppHeader title="Profile" navigation={navigation} />
            <ProfileView />
        </>
    )
}

export default ProfileScreen;