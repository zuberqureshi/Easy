 
import React,{useEffect} from 'react';
import {  Text, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
 

import Navigation from './src/Navigation/index'

import {useNetInfo} from "@react-native-community/netinfo";
import {requestUserPermission,notificationListener} from './src/utiles/notificationService'


function App() {
  
  const net = useNetInfo();

  useEffect(() => {
    requestUserPermission()
    notificationListener()
    
  }, [])
  
 
  return (
    <>
      <Navigation/>
      {/* { !net.isConnected?(<CheckInternet/>):  ()} */}
    </>
        
  );
}

 

export default App;
