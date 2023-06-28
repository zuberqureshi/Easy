import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView , Alert } from 'react-native'
import React,{useLayoutEffect,useEffect, useState,} from 'react'
import Spiner from './spiner'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import  { AuthContext } from "../../utiles/auth-context";
import { ScrollView } from 'react-native-gesture-handler';

import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
 import { BannerAdSize,BannerAd,AppOpenAd, RewardedAd, RewardedAdEventType,  TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId =  'ca-app-pub-2291791121050290/1352844929';
const adUnitIdrewarded =  'ca-app-pub-2291791121050290/6625314913';

const rewarded = RewardedAd.createForAdRequest(adUnitIdrewarded );
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

    if( userWallet <spinAmount){
      Alert.alert('Your wallet has not sufficient Coin'); 
      return;
    }
    setLoadingStatus(true)

    const body = {
      user_id: userInfo.id,
      statusWin:spinValue,
      spinPlaceAmount:spinAmount
    };
    const dailyRewardCheckClaim = await CallApiJson('spinnerRewardClaim', 'POST', body); 
    console.log(" spinnerRewardClaim", dailyRewardCheckClaim);
    setLoadingStatus(false);
    if( spinValue=='WIN' ){
    Alert.alert('Congrats You Have Won , ');
    }else{
      Alert.alert('Sorry You Have Lost , Try Next Time ');

    }
    //   rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    //    rewarded.show();
    // });
    //rewarded.show();
    navigation.navigate('Home');

  }


    useEffect(() => {
      load();
 
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoadingStatus(false)
        //  rewarded.show();
          setLoadingStatus(false)

      });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
           setLoadingStatus(false)
 
        },
      );
  
      // Start loading the rewarded ad straight away
      rewarded.load();
      // Unsubscribe from events on unmount
      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
      };
    }, []);

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
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    <Loader loadingStatus = {loadingStatus} />


    <View style={{flex:1,backgroundColor:'#0a203e'}}>
    <View style={{justifyContent:'center',alignItems:'center',marginTop:responsiveWidth(7)}}>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(3.55)}}> PLAY  SPIN GAME </Text>
          <Text style={{color:'#fff',fontSize:responsiveFontSize(1.7),letterSpacing:responsiveWidth(0.37)}}> Double Your Coin By Playing Spinner </Text>
          {/* <Text style={{color:'#fff',fontSize:responsiveFontSize(1.9),marginTop:responsiveWidth(2.5)}}> Congrat's You have Won {spinAmount } </Text> */}
        </View>

       <Spiner setSpinValue={setSpinValue}  updateSpinnerWheelWinner={updateSpinnerWheelWinner} userWallet={userWallet} setSpinAmount={setSpinAmount} spinAmount={spinAmount}  />
  
    </View>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    </ScrollView>
  )
}

export default SpinerWheel;

const styles = StyleSheet.create({



})