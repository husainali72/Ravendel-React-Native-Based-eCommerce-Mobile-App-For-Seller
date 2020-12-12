import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import styled from 'styled-components';
import Colors from '../../utils/color';
import {BASE_URL} from '../../utils/helper';
import AppLoader from './loader';
import axios from 'axios';
import SyncStorage from 'sync-storage';

const URLComponents = ({url, updateOf, changePermalink, updatePermalink}) => {
  const [editPremalink, setEditPermalink] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeUrl = () => {
    if (editPremalink) {
      setLoading(true);
      isUrlExist(url);
    }
    setEditPermalink(!editPremalink);
  };

  const getUpdatedUrl = async (table, url) => {
    const token = SyncStorage.get('token');
    return axios
      .post(
        `${BASE_URL}/api/misc/checkurl`,
        {
          url: url,
          table: table,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(function (response) {
        if (response.data.success) {
          setLoading(false);
          return response.data.url;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl(updateOf, url);
    updatePermalink(updatedUrl);
  };

  return (
    <>
      {loading ? <AppLoader /> : null}
      <URLWrapper edit={editPremalink}>
        {editPremalink ? (
          <Input
            label="Url"
            value={url}
            onChangeText={(value) => changePermalink(value)}
          />
        ) : (
          <URLLinkWrapper>
            <URLLabel>URL:</URLLabel>
            <URLValue>{url}</URLValue>
          </URLLinkWrapper>
        )}
        <URLBtn onPress={changeUrl}>
          <URLBtnText>{editPremalink ? 'Ok' : 'Edit'}</URLBtnText>
        </URLBtn>
      </URLWrapper>
    </>
  );
};

export default URLComponents;

const URLWrapper = styled.View`
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: ${(props) => (props.edit ? '0px' : '15px')};
  padding-right: ${(props) => (props.edit ? '0px' : '15px')};
`;
const URLLinkWrapper = styled.View`
  flex-direction: row;
  border-bottom-width: 2px;
  border-color: #ddd;
  padding-bottom: 5px;
`;
const URLLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding-right: 10px;
`;
const URLValue = styled.Text`
  font-size: 16px;
`;
const URLBtn = styled.TouchableOpacity`
  background-color: ${Colors.primaryColor};
  padding: 5px 10px;
  width: 75px;
  align-self: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const URLBtnText = styled.Text`
  color: #fff;
  text-align: center;
`;
