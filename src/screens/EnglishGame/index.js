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
  //applovin
import AppLovinMAX from  "react-native-applovin-max";

 

//applovin
AppLovinMAX.initialize("WbvV2RHHbEGVC_s0Od_B0cZoG97sxIom919586O4G_eOin_W3n6ef2WdHqlug5t5IG_ZSo2D6VGE11RWPocUqk").then(configuration => {
  // SDK is initialized, start loading ads
}).catch(error => {
});
const BANNER_AD_UNIT_ID = Platform.select({
  android: '2c0d4e4e0e0d9af8'
 });
 const REWARDED_AD_UNIT_ID = Platform.select({
  android: '3365fad27fce67ed',
 });
 const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: '8fba0df7d5246704',
 });
//applovin

const EnglishGame = () => {

    const [word, setWord] = useState()
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [activty, setActivty] = useState(false)
    const [origWord, setorigWord] = useState()

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

         if(  data.error == false){
          let oword = data.data.word;
           oword   = oword.split('');

          //Remove the first and the last letter
          let first = oword.shift();
          let last = oword.pop();
        
          //Shuffle the remaining letters
          for (let i = oword.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [oword[i], oword[j]] = [oword[j], oword[i]];
          }
          oword =  first + oword.join("") + last;
          setorigWord(  oword  );

         }

         setGameData(data);
          console.log('English game word data',data);
      }

      const showToast =  (msg) => {
        ToastAndroid.show(`${msg} !`, ToastAndroid.SHORT);
      };


  const claimEnglish = async() =>{

    // setLoadingStatus(true);
   await showApplovinIntrestial();
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
          showApplovinRewarded();
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





 

//applovin 
useEffect(() => {

  //intrestial
  AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
    // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
    //AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
    }
  });
  // rewarded
  AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
    const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
if (isRewardedAdReady) {
   //AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
 }
  });
  //rewarded


 
   return () => { 
    appLovinIntrestial();
    appLovinRewarded();

   }

}, []);


const showApplovinIntrestial = async ()=>{
  const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
  if (isInterstitialReady) {
        AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
        return true;
  }else{
    return false;
  }
}
 

const showApplovinRewarded =()=>{
  AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
}
 


//applovin 


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

             <Text style={{color:'#fff',fontSize:responsiveFontSize(2.1)}}> Given Lettter is  : {origWord }</Text>

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