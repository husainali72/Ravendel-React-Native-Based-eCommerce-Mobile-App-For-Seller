import React, {useState} from 'react';
import {SettingWrapper} from './styles';
import {CheckBox} from "@rneui/themed";

const SettingView = ({navigation}) => {
  const [orderNotification, setOrderNotification] = useState(true);

  return (
    <>
      <SettingWrapper>
        <CheckBox
          title="Get Order Notification"
          checked={orderNotification}
          onPress={() => setOrderNotification(!orderNotification)}
        />
      </SettingWrapper>
    </>
  );
};

export default SettingView;
