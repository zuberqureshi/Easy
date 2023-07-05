import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView , Alert } from 'react-native'
import React,{useLayoutEffect,useEffect, useState,} from 'react'
import Spiner from './spiner'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import  { AuthContext } from "../../utiles/auth-context";
import { ScrollView } from 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';

import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
import AppLovinMAX from  "react-native-applovin-max";

// admob
const adUnitId =  'ca-app-pub-5493577236373808/8452330072';
const adUnitIdrewarded =  'ca-app-pub-5493577236373808/2741101726';
const adUnitIdIntrestial  =  'ca-app-pub-5493577236373808/6488775047';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, { 
});
const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded,{} );
// admob


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

const SpinerWheel = () => {
 
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState()
  const [userWallet, setUserWallet] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [spinValue, setSpinValue] = useState()
  const [spinAmount, setSpinAmount] = useState()
 

    //Get User Info
    const getUserInfo = async () => {
      setLoadingStatus(true)

      const ds = await getToken();
    const data = await JSON.parse(ds)
    await setUserInfo(data)

    let body = {
      user_id:data.id
    }
    const seting = await CallApiJson('getprofile', 'POST',body);
    // const data = await JSON.parse(seting)
    await setUserWallet(seting.data.wallet_coins);
    setLoadingStatus(false)
    }

   const load = async () => {
    await getUserInfo();
  
   }


  //DailyRewardClaim
  const updateSpinnerWheelWinner = async () => {

    console.warn('updateSpinnerWheelWinner',spinValue,spinAmount,'userWallet',userWallet)
    await showApplovinIntrestial();
    await showApplovinRewarded();

    if( userWallet <spinAmount){
      Alert.alert('Your wallet has not sufficient Coin'); 
      return;
    }
    setLoadingStatus(true)
    const currentVersion = VersionCheck.getCurrentVersion()

    const body = {
      user_id: userInfo.id,
      statusWin:spinValue,
      spinPlaceAmount:spinAmount,
      currentVersion:currentVersion
    };

    const dailyRewardCheckClaim = await CallApiJson('spinnerRewardClaim', 'POST', body); 
    console.log(" spinnerRewardClaim", dailyRewardCheckClaim);
    setLoadingStatus(false);
    if( spinValue=='WIN' ){
    Alert.alert('Congrats You Have Won , ');
    }else{
      Alert.alert('Sorry You Have Lost , Try Next Time ');
    }
 
    navigation.navigate('Home');
  }

useEffect(() => {
 load();
  const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
 });
 const unsubscribeEarned = rewarded.addAdEventListener(
   RewardedAdEventType.EARNED_REWARD,
   reward => {

     },
 );

 // Start loading the rewarded ad straight away
 rewarded.load();

 const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
     interstitial.show()
 });

// Start loading the interstitial straight away
interstitial.load();


 // Unsubscribe from events on unmount
 return () => {
   unsubscribe();
   unsubscribeLoaded();
   unsubscribeEarned();
 };
}, []);



 


//applovin 
useEffect(() => {

  //intrestial
  AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
    // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {

        //  setclaimButton(false);
        //  setbuttonDisableTrue(false);
        //  AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);

    }

  });
  // rewarded
  AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
    const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
if (isRewardedAdReady) {
  AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
}


  });
  //rewarded


 
   return () => { 
   // appLovinIntrestial();
  //  appLovinRewarded();

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
 

const showApplovinRewarded =async ()=>{

  console.log('showApplovinRewardedfucntion' );
    AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
  

}
 


//applovin 




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
          <Icon onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
          <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
          <Icon  name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
          </TouchableOpacity>
        </View>
        
      ),

    });
  }, []);



 


 console.log("spinner value state",spinValue)
 console.log("spinner Amount state",spinAmount)

  return (
<ScrollView> 
<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
       
    />
    <Loader loadingStatus = {loadingStatus} />


    <View style={{flex:1,backgroundColor:'#0a203e'}}>
        <View style={{justifyContent:'center',alignItems:'center',marginTop:responsiveWidth(7)}}>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(3.55)}}> PLAY  SPIN GAME </Text>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(1.7),letterSpacing:responsiveWidth(0.37)}}> Double Your Coin By Playing Spinner </Text>
          {/* <Text style={{color:'#fff',fontSize:responsiveFontSize(1.9),marginTop:responsiveWidth(2.5)}}> Congrat's You have Won {spinAmount } </Text> */}
        </View>

       <Spiner setSpinValue={setSpinValue}  updateSpinnerWheelWinner={updateSpinnerWheelWinner} showApplovinRewarded={showApplovinIntrestial} userWallet={userWallet} setSpinAmount={setSpinAmount} spinAmount={spinAmount}  />
  
    </View>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
     
    />
    </ScrollView>
  )
}

export default SpinerWheel;

const styles = StyleSheet.create({



})