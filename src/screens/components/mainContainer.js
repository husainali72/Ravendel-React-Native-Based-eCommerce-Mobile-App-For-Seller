import React from 'react';
import {ScrollView, View} from 'react-native';

const MainContainer = ({children}) => (
  <ScrollView>
    {children}
    <View style={{height: 60}} />
  </ScrollView>
);

export default MainContainer;
