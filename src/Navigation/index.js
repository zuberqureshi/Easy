import { View, Text,StatusBar } from 'react-native'
import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Drawer from './Drawer'


const Naviagtion = () => {


  return (




  <NavigationContainer>
    <StatusBar backgroundColor="#1f4c86"/>
    {/* <HomeStack /> */}
    <Drawer/>
  </NavigationContainer>





  )
}

export default Naviagtion