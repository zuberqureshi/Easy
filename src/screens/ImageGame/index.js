import { View, Text, Image, TouchableOpacity, Modal, TextInput, TouchableHighlight,FlatList,ActivityIndicator, Alert,Keyboard,ToastAndroid,StyleSheet  } from 'react-native'
import React from 'react'
import { useLayoutEffect, useState,useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../components/common/loader/Loader';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';

const ImageGame = () => {
    
    const [blurState, setBlurState] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState()
    const [selectedOption, setSelectedOption] = useState()
    const [optionOff, setOptionOff] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)

    const navigation = useNavigation();


    const  dataOption = [
         'to live',
         'to have lived', 
         'to be lived', 
         'to be living',
    ]
    const  loadUserInfo = async () =>{
      // const data = await JSON.parse(seting)
      setLoadingStatus(true)
     const  userdata = await getToken();
     const userdataParsed = await JSON.parse(userdata)
     const body = {
      user_id: userdataParsed.id,
      category:route.params.category
    };

     const questionData = await CallApiJson('gkquestion', 'POST',body);
    //  setLoadingStatus(false);
    if( !questionData.questions ){
      Alert.alert('No Questions on Server , Please Try Again ');
      return;
    }
       await setApiQues(questionData)
       await setQuestions(questionData?.questions)
    //  setuserProfileData(profileData);
       setLoadingStatus(false)
  }
 

    //Get User checkGameEligiblility
    const checkGameEligiblility = async () => {
      setLoadingStatus(true)

      const ds = await getToken();
    const data = await JSON.parse(ds)
 
    let body = {
      user_id:data.id
    }
    const checkGameEligibility = await CallApiJson('checkGameEligibility', 'POST',body);
    // const data = await JSON.parse(seting)
        if( checkGameEligibility.error==true  ){

          setLoadingStatus(false)
          Alert.alert(checkGameEligibility.msg);
          navigation.navigate('Home');
          return;
        }else{
          return ;
        }


    }
    useEffect(() => {
      //   console.log('userprofile',userProfileData)
      checkGameEligiblility()
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
    <View style={{flex:1,backgroundColor:'#0a203e'}}>
        <Text style={{color:'#fff',marginTop:responsiveWidth(4),marginLeft:responsiveWidth(5),fontSize:responsiveFontSize(2.1)}}>Guesss Person</Text>

        <View style={{marginTop:responsiveWidth(7)}} >
            <Image style={{width:responsiveWidth(40),height:responsiveHeight(20),borderRadius:responsiveWidth(20),resizeMode:'contain',alignSelf:'center',marginBottom:responsiveWidth(2.4)}} blurRadius={blurState?20:0} source={require('../../assets/person.jpg')} />

            <FlatList
      data={dataOption}
      renderItem={({item,index})=>{
        return(
          <TouchableOpacity disabled={optionOff} style={[styles.quesOption,{ backgroundColor:selectedIndex==index?'#1f4c86':'#fff'}]} 
          onPress={()=>{
            // console.warn(index)
            // selectedOption(index + 1);
            setSelectedOption(item)
            setSelectedIndex(index)
            // console.warn(item)
          }}>
             
        <View style={[styles.optionNumberView,{ backgroundColor:selectedIndex==index?'#fff':'#1f4c86'}]}>
        
        <Text style={{fontWeight: '600', color:selectedIndex==index?'#000':'#fff' }}>
        {index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}
        </Text>
        
        </View>

        <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '600', marginLeft: responsiveWidth(2.5),color:selectedIndex==index?'#fff':'#000',marginVertical:responsiveWidth(1),width:responsiveWidth(75)}}>
                  {item}
                </Text>

          </TouchableOpacity>
        )
      }}
     /> 
    </View>   

      <TouchableOpacity style={{alignSelf:'center',marginTop:responsiveWidth(10),borderWidth:responsiveWidth(0.2),paddingHorizontal:responsiveWidth(8),paddingVertical:responsiveWidth(2.5),borderRadius:responsiveWidth(2.5),borderColor:"#fff",backgroundColor:'#1f4c86',elevation:responsiveWidth(3)}}
         
         onPress={
            
            ()=>{
                setOptionOff(true)
                console.log(selectedOption)
                setBlurState(false)
            }
        
            }
      
      
      >
          <Text style={{color:'#fff',fontSize:responsiveFontSize(1.9),letterSpacing:responsiveWidth(0.1)}} >Submit</Text>
      </TouchableOpacity>
        
    </View>
  )
}

export default ImageGame

const styles = StyleSheet.create({

    quesOption:{
        width:'90%',
        height:responsiveHeight(5.95),
        elevation:responsiveWidth(1),
       
        borderRadius:responsiveWidth(2.5),
              marginTop:responsiveWidth(2.45),
              marginBottom:responsiveWidth(2.45),
              alignSelf:'center',
              alignItems:'center',
              paddingLeft:responsiveWidth(3.5),
              flexDirection:'row'
     },
     optionNumberView:{
        width:responsiveWidth(7.4),
        height:responsiveHeight(3.5),
        borderRadius:responsiveWidth(3.5),
      
        justifyContent:'center',
        alignItems:'center'
     },
})