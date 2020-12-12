import React, {useEffect, useState} from 'react';
import EditAttrView from './view';
import AppHeader from '../../components/header';
import {isEmpty} from '../../../utils/helper';

const EditAttributeScreen = ({navigation, route}) => {
  const [singleAttrID, setSingleAttrID] = useState({});

  useEffect(() => {
    if (route.params && route.params.id) {
      setSingleAttrID(route.params.id);
    }
  }, [route.params]);
  return (
    <>
      <AppHeader title="Edit Attribute" navigation={navigation} back />
      {!isEmpty(singleAttrID) ? (
        <EditAttrView navigation={navigation} singleAttrID={singleAttrID} />
      ) : null}
    </>
  );
};

export default EditAttributeScreen;
