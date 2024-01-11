// import React, {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
// import Styles from '../common-styles';
// import NetInfo from "@react-native-community/netinfo";

// const InternetConnectivity = () => {
//   const [internetConnectivity, setInternetConnectivity] = useState(false);
//   const checkInternetConnectivity = NetInfo.addEventListener((state) => {
//     // console.log('Internet connectivity', state);
//     if (!state.isConnected) {
//       setInternetConnectivity(true);
//     }
//   });

//   useEffect(() => {
//     checkInternetConnectivity();
//   }, []);

//   return (
//     <>
//       {internetConnectivity ? (
//         <View style={Styles.intertLost}>
//           <Text style={Styles.intertLostText}>
//             Your are offline. Please check your Wifi or Internet connection.
//           </Text>
//         </View>
//       ) : null}
//     </>
//   );
// };

// export default InternetConnectivity;
