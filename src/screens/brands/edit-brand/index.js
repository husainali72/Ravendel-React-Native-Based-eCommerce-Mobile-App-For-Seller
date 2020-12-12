import React, {useEffect, useState} from 'react';
import EditBrandView from './view';
import AppHeader from '../../components/header';

const EditBrandScreen = ({navigation, route}) => {
  const [singleBrandDetail, setSingleBrandDetail] = useState({});

  useEffect(() => {
    if (route.params && route.params.singleBrand) {
      setSingleBrandDetail(route.params.singleBrand);
    }
  }, [route.params]);

  return (
    <>
      <AppHeader title="Edit Brand" navigation={navigation} back />
      <EditBrandView
        singleBrandDetail={singleBrandDetail}
        navigation={navigation}
      />
    </>
  );
};

export default EditBrandScreen;
