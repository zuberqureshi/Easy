import { View, Text, Image, TouchableOpacity, Modal, TextInput, TouchableHighlight,FlatList,ActivityIndicator, Alert,Keyboard,ToastAndroid  } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState,useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';



const EnglishGame = () => {

    const [word, setWord] = useState()
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [activty, setActivty] = useState(false)
    const [gameData, setGameData] = useState({});

    const navigation = useNavigation();
    console.log("word guess",gameData)
    var w ='danish'



    const  loadUserInfo = async () =>{
        setLoadingStatus(true);
          // const data = await JSON.parse(seting)
         const  userdata = await getToken();
         const userdataParsed = await JSON.parse(userdata)
         const body = {
          user_id: userdataParsed.id,
        };
    
         const data = await CallApiJson('getEnglishQuestion', 'POST',body);
         setLoadingStatus(false);
    
         setGameData(data);
          console.log('English game word data',data);
      }

      const showToast =  (msg) => {
        ToastAndroid.show(`${msg} !`, ToastAndroid.SHORT);
      };


  const claimEnglish = async() =>{

    // setLoadingStatus(true);
    setActivty(true)
    if(word==null){
        Alert.alert('Please fill the answer,After submit');
        setActivty(false);
        return;

    }
 else{   // const data = await JSON.parse(seting)
   const  userdata = await getToken();
   const userdataParsed = await JSON.parse(userdata)
   const body = {
    user_id: userdataParsed.id,
    word:word,
    orig_word:gameData?.data?.word
  };

   const data = await CallApiJson('claimEnglishQuestion', 'POST',body);
   setActivty(false)
   Alert.alert(data.msg);
   navigation.navigate('Home');
  }
}
      
    useEffect(() => {
    //   console.log('userprofile',userProfileData)
    
      loadUserInfo();
      return  ()=>{
        console.log('return')
      }
    }, [])

//header
useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => {navigation.openDrawer()
          Keyboard.dismiss() }}>

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


  return (
   
    <View style={{flex:1,backgroundColor: '#0a203e'}}>
     <Loader loadingStatus = {loadingStatus} />
        <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1),letterSpacing: responsiveWidth(0.2),
        marginVertical:responsiveWidth(5),marginLeft:responsiveWidth(4)}}> Guess the correct word using given letters   </Text>
     <View style={{flex:0.6,justifyContent:'center',paddingHorizontal:responsiveWidth(10)}}>
      <LinearGradient colors={["#0a203e", "#1f4c86"]}
                   useAngle={true}
                   angle={322}
                   angleCenter={{ x: 0.5, y: 0.5 }}
                   style={{  borderRadius: responsiveWidth(2.45), 
     elevation: responsiveWidth(1),
      borderWidth: responsiveWidth(0.3),

   borderColor:  '#1f4c86',
   alignSelf:'center',
  justifyContent:'center',
  alignItems:'center',
  paddingHorizontal:responsiveWidth(10),
  paddingVertical:responsiveWidth(6)

   }}>
           {/* <View
             style={{
               backgroundColor: '#1f4c86',
               width: '90%',
               
               borderRadius: 10,
             }}> */}

             <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1)}}> Given Lettter is  : {gameData?.data?.word}</Text>

             <View style={{  borderWidth: responsiveFontSize(0.2),
     borderColor: '#0a203e', 
     borderRadius: responsiveWidth(6.25),
     width: responsiveWidth(48.5),
      alignItems: 'center',
       marginTop: responsiveWidth(5), 
       alignSelf: 'center' }}>
              <TextInput
                onChangeText={text => setWord(text)}
                placeholder="Enter Correct Word"
                placeholderTextColor="#fff"
                autoCorrect={false}
                value={word}
           
                color='#fff'
                maxLength={(gameData?.data?.word)?.length}
              />
            </View>
 
             <TouchableOpacity
               style={{  alignSelf: 'center',
    height: responsiveHeight(4.8),
    padding: responsiveWidth(2.45),
  
    borderRadius: responsiveWidth(2.45),
    marginTop: responsiveWidth(8),
  
    backgroundColor:'#0a203e',
   
    elevation:responsiveWidth(1.5),
    flexDirection:'row'}}
               onPress={() => {
                claimEnglish()
               }}>


               <Text style={{color: '#fff',
     paddingHorizontal:  responsiveWidth(2.45),
      letterSpacing: responsiveWidth(0.2)}}>Submit</Text>
       {activty?<ActivityIndicator  size="small" color="#fff" />:null}
             </TouchableOpacity>
           {/* </View> */}
           </LinearGradient>
           </View>
 
 
     </View>
    
  )
}

export default EnglishGame;