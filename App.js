 
import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
 

import Navigation from './src/Navigation/index'

import {useNetInfo} from "@react-native-community/netinfo";
import {requestUserPermission,notificationListener} from './src/utiles/notificationService'
import AuthContextProvider from "./src/utiles/auth-context";


function App() {
  
  const net = useNetInfo();

  useEffect(() => {
    requestUserPermission()
    notificationListener()
    
  }, [])
  
 
  return (
    <>
     <AuthContextProvider>
     <Navigation/>
      </AuthContextProvider>

     
      {/* { !net.isConnected?(<CheckInternet/>):  ()} */}
    </>
        
  );
}



export default App;
