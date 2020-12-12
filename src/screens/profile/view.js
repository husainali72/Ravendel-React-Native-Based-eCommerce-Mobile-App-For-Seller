import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import {
  ProfileWrapper,
  UserProfileAndNameWrapper,
  UserProfileName,
  UserProfileRow,
  UserProfileValue,
  UserProfileLable,
  EditRow,
  EditBtn,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context} from '../../context/AuthContext';
import {BASE_URL, isEmpty} from '../../utils/helper';
import AppLoader from '../components/loader';

const ProfileView = ({navigation}) => {
  const {state} = useContext(Context);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (state && state.user) {
      setUserDetails(JSON.parse(state.user));
    }
  }, [state]);
  return (
    <>
      {isEmpty(userDetails) ? (
        <AppLoader />
      ) : (
        <ProfileWrapper>
          <UserProfileAndNameWrapper>
            {userDetails.image && userDetails.image.original ? (
              <Avatar
                rounded
                size="xlarge"
                source={{
                  uri: BASE_URL + userDetails.image.original,
                }}
              />
            ) : null}

            <EditRow>
              <UserProfileName>{userDetails.name}</UserProfileName>
              <EditBtn>
                <Icon name="pencil" size={18} color="#000" />
              </EditBtn>
            </EditRow>
          </UserProfileAndNameWrapper>
          <UserProfileRow>
            <UserProfileLable>Role</UserProfileLable>
            <UserProfileValue>{userDetails.role}</UserProfileValue>
          </UserProfileRow>
          <UserProfileRow>
            <UserProfileLable>Email</UserProfileLable>
            <UserProfileValue />
          </UserProfileRow>
        </ProfileWrapper>
      )}
    </>
  );
};

export default ProfileView;
