import { View, Text, Button, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal, TouchableHighlight, ToastAndroid,StyleSheet } from 'react-native'
import React,{ useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";



const Reward = () => {

    const navigation = useNavigation();

  //  Header start
  useLayoutEffect(() => {


    navigation.setOptions({

      headerLeft: () => (

        <TouchableOpacity onPress={() => navigation.openDrawer()}>

          <Icon name="menu" size={responsiveWidth(7)} color="#fff" />
        </TouchableOpacity>
      ),

      headerTitle: "",
      headerStyle: {
        backgroundColor: '#1f4c86'

      },
      headerRight: () =>
      (

        <View style={{ flexDirection: 'row' }}>
          <Icon onPress={() => { navigation.navigate('Wallet') }} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5) }} />
          <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
            <Icon name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
          </TouchableOpacity>
        </View>

      ),



    });
  }, []);

  //  Header End

  return (
    <View style={{ flex: 1, backgroundColor: "#0a203e", }} >



    <LinearGradient colors={["#0a203e", "#1f4c86"]}
      useAngle={true}
      angle={322}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={{  flex: 0.7,
     borderRadius: responsiveWidth(2.5),
      height: 50, 
      elevation: responsiveWidth(1.5), 
  marginHorizontal:responsiveWidth(5),
       borderWidth: responsiveWidth(0.2), 
       borderColor: '#1f4c86', 
       marginTop:responsiveWidth(25)
     
      }}>
      <View style={{justifyContent:'center',alignItems:'center' }} >
      <Text
                  style={{
                    fontSize: responsiveFontSize(3.55),
                    letterSpacing: responsiveWidth(0.35),
                    fontWeight: '600',

                    marginTop: responsiveWidth(7),
                    color: '#fff'
                  }}>
                  Congrats
                </Text>
                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(1.2),
                    color: '#fff',

                  }}>
                  Come back everyday to earn{'\n'}
                  {'        '}Extra reward coins!
                </Text>
                <Image style={{ width: responsiveWidth(46), height: responsiveHeight(20), marginTop: responsiveWidth(4) }} source={require('../../assets/dailygift.png')} />

                <Text
                  style={{
                    fontSize: responsiveWidth(3.8),
                    marginTop: responsiveWidth(5),
                    color: '#fff',

                  }}>
                  YOUR REWARD TODAY IS
                </Text>
                <View style={{ flexDirection: 'row' }} >
                  <Image style={{ width: responsiveWidth(7.15), height: responsiveHeight(3.65), marginTop: responsiveWidth(0.5), marginRight: responsiveWidth(1) }} source={require('../../assets/coin.png')} />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.9),
                      marginTop: responsiveFontSize(0.7),
                      color: '#fff',

                    }}>
                  500 Coins
                  </Text>
                </View>
                <TouchableOpacity
                  style={{

                    height: responsiveHeight(6),
                    padding: responsiveWidth(2.5),
                    width:responsiveWidth(50),
                    borderRadius: responsiveWidth(2.5),
                    marginTop: responsiveWidth(8),
                    // marginBottom: responsiveWidth(5),
                    backgroundColor: '#0a203e',
                    color: '#fff',
                    elevation: responsiveWidth(1.2),
                    justifyContent:'center',
                    alignItems:'center'
                  }}
                
                  onPress={() => {
               


                  }}>
                  <Text style={{ color: '#fff', paddingHorizontal: responsiveWidth(2.4), letterSpacing: responsiveFontSize(0.095) }}>Back To Home</Text>
                </TouchableOpacity>
          
      </View>
    </LinearGradient>



      

    
    </View>

   
  )
}

export default Reward

const styles = StyleSheet.create({


})